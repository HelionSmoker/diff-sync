function copy(text) {
	navigator.clipboard.writeText(text).then(
		function () {
			console.log(`Copied: ${text}`);
		},
		function (err) {
			console.error("Could not copy text: ", err);
		}
	);
}

function sortArrayWithTime(arr, pos) {
	// Note: .slice() to create a new array
	const upperBound = new Date("9999-01-01");
	return arr.slice().sort((a, b) => {
		const timeA = a[pos] === "" ? upperBound : new Date("1970-01-01 " + a[pos]);
		const timeB = b[pos] === "" ? upperBound : new Date("1970-01-01 " + b[pos]);
		return timeA - timeB;
	});
}

function fmtDate(dateObj) {
	return dateObj.toLocaleDateString("en-US", {
		month: "2-digit",
		day: "2-digit",
	});
}

function findMostFrequent(freqMap) {
	const sortedEntries = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
	return sortedEntries.length > 0 ? sortedEntries[0][0] : undefined;
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function parseConf(conf) {
	// A future-proof way to extract the conf ('100064706' -> 64706)
	const confInt = parseInt(conf.replace(/\D/g, ''));
	return confInt > 10 ** 8 ? confInt - 10 ** 8 : confInt;
}

function parseName(name) {
	// Keep only alpha chars and space (\s)
	const result = name.replace(/[^a-zA-Z\s]/g, "");
	return toTitleCase(result)
}

function parseJobs(input) {
	// When the cell contains a new line char, Sheets will wrap the cell in double quotes
	// Sheets also uses a double quote to escape another double quote.
	input = input.replaceAll(`""`, "");

	let result = [];
	let rowValues = [];
	let cellValue = "";
	let isEscaped = false;

	for (var char of input) {
		if (char === '"') {
			isEscaped = !isEscaped;
		} else if ((char === "\t" || char === "\n") && !isEscaped) {
			rowValues.push(cellValue.trim());
			cellValue = "";
			if (char === "\n") {
				result.push(rowValues);
				rowValues = [];
			}
		} else if (char !== "\n") {
			cellValue += char;
		}
	}

	// Add remaining values after the loop
	if (cellValue) rowValues.push(cellValue);
	if (rowValues.length > 0) result.push(rowValues);

	return result;
}

function mapJobsSystem(rows) {
	let result = {};

	rows.forEach((cols) => {
		// Disregard empty rows
		if (cols[0] === "" || cols.length < 4) return;

		let [conf, vendor, wname, start] = cols;
		conf = parseConf(conf);

		// Track non-assigned jobs. We modify the wname to have a unique entry in the hashmap.
		// Duplicate entries in the Sheet will simply be ignored because a System counterpart
		// will not be found.
		while (conf in result && wname in result[conf]) {
			wname += " ";
		}

		result[conf] = {
			...(result[conf] || {}),
			[parseName(wname)]: [vendor, start],
		};
	});
	return result;
}

function mapJobsSheet(rows) {
	let result = {};
	let dateToCount = {};

	rows.forEach((cols) => {
		// Disregard empty rows
		if (cols[1] === "" || cols.length < 8) return;

		let [date, conf, _vendor, wname, uploadPeriod, source, comment] = cols;
		conf = parseConf(conf);

		if (!isNaN(Date.parse(date))) {
			// Note: if dateToCount[date] is undefined it will be replaced by 0
			dateToCount[date] = (dateToCount[date] ?? 0) + 1;
		}
		if (source === "") {
			source = "CES App";
		}

		uploadPeriod = uploadPeriod.toLowerCase();
		if (!(["before", "during"].includes(uploadPeriod))) {
			uploadPeriod = "";
		}

		result[conf] = {
			...(result[conf] || {}),
			[parseName(wname)]: [uploadPeriod, source, comment],
		};
	});

	const mostFreqDate = findMostFrequent(dateToCount) || fmtDate(new Date());
	result["globalDate"] = mostFreqDate;

	return result;
}

function calcMaskLength(rowCount) {
	return rowCount < 248 ? 250 : (Math.ceil(rowCount / 10) + 1) * 10;
}

function combine(system, sheet, systemRowCount, sheetRowCount) {
	let result = [];
	let date = sheet["globalDate"];

	for (let conf in system) {
		for (let wname in system[conf]) {
			let manualValues = ["", "CES App", ""];
			if (conf in sheet && wname in sheet[conf]) {
				manualValues = sheet[conf][wname];
			}
			result.push([
				date,
				conf,
				system[conf][wname][0],
				wname,
				...manualValues,
				system[conf][wname][1],
			]);
		}
	}

	// Subtract 2 due to header
	const systemMaskLength = calcMaskLength(systemRowCount) - 2;
	const sheetMaskLength = calcMaskLength(sheetRowCount) - 2;

	result = [
		...result,
		...Array(systemMaskLength - result.length).fill([date, "", "", "", "", "CES App", "", ""]),
	];

	// Create an anchor point in Sheets so deleting these rows is easier
	if (sheetMaskLength > systemMaskLength) {
		result = [
			...result,
			...Array(sheetMaskLength - result.length).fill(["", "", "", "", "", "", "", ""]),
		];
	}

	return result;
}

function clearTableBody(tbody) {
	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}
}

function addTableBody(array, tbody) {
	array.forEach((row) => {
		// Note: row[0] is the date, which is typically never empty
		if (row[1] === "") return;
		const rowNode = tbody.insertRow();
		row.forEach((cell) => {
			const cellNode = rowNode.insertCell();
			cellNode.textContent = cell;
		});
	});
}

function countRows(obj) {
	return Object.values(obj).reduce((acc, value) => acc + Object.keys(value).length, 0);
}

function showSuccessState(button, oldContent) {
	button.textContent = "Success!";
	setTimeout(() => {
		button.innerText = oldContent;
	}, 1000);
}

globalRows = [];

function processInput() {
	// Note: .textContent will return an empty string
	const [leftArea, rightArea] = [...document.getElementById("textarea-container").children].map(
		(node) => node.value.trim(),
	);

	const systemJobs = mapJobsSystem(parseJobs(leftArea));
	const systemRowCount = countRows(systemJobs);
	const sheetRows = parseJobs(rightArea);
	const sheetJobs = mapJobsSheet(sheetRows);

	const tableBody = document.body.getElementsByTagName("tbody")[0];
	// Remove previous rows before adding another new ones
	clearTableBody(tableBody);

	const combinedJobs = combine(systemJobs, sheetJobs, systemRowCount, sheetRows.length);
	const combinedJobsSorted = sortArrayWithTime(combinedJobs, 7);
	addTableBody(combinedJobsSorted, tableBody);

	const tableContainer = document.getElementById("table-container");
	tableContainer.style.display = "flex";

	const rowCountContainer = document.getElementById("row-count-container");
	const rowCountNode = rowCountContainer.firstElementChild;
	rowCountNode.textContent = `Row count: ${systemRowCount}`;
	rowCountContainer.style.display = "flex";

	globalRows = combinedJobsSorted;
}

function copyRows() {
	const copyButton = document.getElementById("buttons-container").children[1];
	if (globalRows.length === 0) {
		processInput();
	}

	copy(globalRows.map((row) => row.join("\t")).join("\n"));
	showSuccessState(copyButton, "Copy");
}
