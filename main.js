function copy(text) {
	navigator.clipboard.writeText(text).then(
		function () {
			console.log(`Copied: ${text}`);
		},
		function (err) {
			console.error("Could not copy text: ", err);
		},
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
	return str.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function parseConf(conf) {
	const confInt = parseInt(conf.replace(/\D/g, "")); // Keep only the digits
	// Handle both formats: '100064706' and '64706' -> 64706
	return confInt > 10 ** 8 ? confInt - 10 ** 8 : confInt;
}

function parseName(name) {
	name = name
		.replace(/[^a-zA-Z\s]/g, "") // Keep only alpha and space
		.replace(/ +/g, " "); // Remove multiple consecutive spaces

	return toTitleCase(name);
}

function parseDate(dateStr) {
	for (const candidate of [dateStr, `${dateStr} 2023`]) {
		// Keep only alphanumeric, space, '.' or '/'
		const parsedDate = Date.parse(candidate.replace(/[^a-zA-Z0-9 ./]/g, ""));
		if (!isNaN(parsedDate)) {
			return parsedDate;
		}
	}

	return -1;
}

function parseUploadPeriod(uploadPeriod) {
	uploadPeriod = uploadPeriod.toLowerCase().replace(/[^a-z]/g, ""); // Keep only alpha

	if (["before", "during"].includes(uploadPeriod)) {
		return uploadPeriod;
	}

	return "";
}

function parseSource(source) {
	source = source.toLowerCase().replace(/[^a-z]/g, ""); // Keep only alpha

	if (source === "spotchecker") return "SpotChecker";

	return "CES App";
}

export function parseTable(input) {
	// When the cell contains a newline char, Google Sheets will wrap the cell in double
	// quotes. Sheets also uses double quotes to escape the original double quotes.

	if (input.length === 0) return [[""]];

	// We need a final newline char to push the last line
	if (!input.endsWith('\n')) input += '\n'

	let parsedTable = [];
	let currentRow = [];
	let currentCell = "";
	let prevCharIsQuotes = false;
	let inQuotes = false;

	for (var char of input) {
		if (char === '"' && currentCell === "") {
			inQuotes = true;
		}

		if (char !== "\t" && char !== "\n") {
			currentCell += char;
			prevCharIsQuotes = char === '"';
			continue;
		}
		
		if (prevCharIsQuotes) inQuotes = false;

		if (inQuotes) {
			currentCell += char;

			if (char === '\n') continue
		}

		currentRow = currentRow.concat(formatCell(currentCell));
		currentCell = "";
		
		if (char === "\n") {
			parsedTable.push(currentRow);
			currentRow = [];
		}
	}

	// Add remaining values after the loop
	if (currentCell.length > 0) currentRow = currentRow.concat(formatCell(currentCell));
	if (currentRow.length > 0) parsedTable.push(currentRow);

	return parsedTable;
}

function formatCell(cell) {
	// Remove trailing newlines that might
	let fmtCell = cell.replaceAll('\t', '').trim();

	// Replace all whitespace with a regular space and escaped quotes with
	// regular quotes
	if (fmtCell.startsWith('"') && fmtCell.endsWith('"') && fmtCell.includes('\n')) {
		return [fmtCell.slice(1, -1).replace(/\s/g, ' ').replaceAll('""', '"').trim()];
	} else {
		return fmtCell.split('\n').map(part => part.trim())
	}
}

function mapJobsSystem(rows) {
	let result = {};

	rows.forEach((cols) => {
		// Disregard empty rows
		if (cols[0] === "" || cols.length < 4) return;

		let [conf, vendor, workerName, start] = cols;
		conf = parseConf(conf);

		// Track non-assigned jobs. Since they are empty be default, we want to modify the
		// workerName so that we have a unique entry in the hashmap. This also removes duplicate
		// NON-EMPTY entries from the system and ALL duplicates from the SHEET, since a SYSTEM
		// counterpart will not be found.
		while (workerName.trim() === "" && conf in result && workerName in result[conf]) {
			workerName += " ";
		}

		result[conf] = {
			...(result[conf] || {}),
			[parseName(workerName)]: [vendor, start],
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

		let [date, conf, _vendor, workerName, uploadPeriod, source, comment] = cols;

		date = parseDate(date);
		if (date !== -1) {
			date = fmtDate(new Date(date));
			dateToCount[date] = (dateToCount[date] ?? 0) + 1;
		}

		conf = parseConf(conf);
		workerName = parseName(workerName);
		uploadPeriod = parseUploadPeriod(uploadPeriod);
		source = parseSource(source);

		comment.replaceAll("  ", "");

		result[conf] = {
			...(result[conf] || {}),
			[workerName]: [uploadPeriod, source, comment],
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
		for (let workerName in system[conf]) {
			let manualValues = ["", "CES App", ""];
			if (conf in sheet && workerName in sheet[conf]) {
				manualValues = sheet[conf][workerName];
			}
			result.push([
				date,
				conf,
				system[conf][workerName][0],
				workerName,
				...manualValues,
				system[conf][workerName][1],
			]);
		}
	}

	// Subtract 2 due to header
	const systemMaskLength = calcMaskLength(systemRowCount) - 2;
	const sheetMaskLength = calcMaskLength(sheetRowCount) - 2;

	result = result.concat(
		Array(systemMaskLength - result.length).fill([date, "", "", "", "", "CES App", "", ""]),
	);

	// Create an anchor point in Sheets so deleting these rows is easier
	if (sheetMaskLength > systemMaskLength) {
		result = result.concat(
			Array(sheetMaskLength - result.length).fill(["", "", "", "", "", "", "", ""]),
		);
	}

	return result;
}

function adjustTBodySize(tbody, targetSize) {
	const tableRows = tbody.children;
	const sizeDiff = targetSize - tableRows.length;

	if (sizeDiff < 0) {
		removeTableRows(tbody, Math.abs(sizeDiff), tableRows);
	} else if (sizeDiff > 0) {
		addTableRows(tbody, sizeDiff);
	}
}

function addTableRows(tbody, rowCount, cellCount = 8) {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < rowCount; i++) {
		const rowNode = document.createElement("tr");

		for (let j = 0; j < cellCount; j++) {
			const cellNode = document.createElement("td");
			rowNode.appendChild(cellNode);
		}

		fragment.appendChild(rowNode);
	}

	tbody.appendChild(fragment);
}

function removeTableRows(tbody, rowCount, tableRows) {
	for (let i = 0; i < rowCount; i++) {
		tbody.removeChild(tableRows[i]);
	}
}

function populateTBody(tbody, array) {
	const tableRows = Array.from(tbody.children);

	tableRows.forEach((rowNode, i) => {
		const cells = Array.from(rowNode.children);
		cells.forEach((cellNode, j) => {
			cellNode.textContent = array[i][j];
		});
	});
}

function countRows(obj) {
	return Object.values(obj).reduce((acc, value) => acc + Object.keys(value).length, 0);
}

function showSuccessState(button, oldContent) {
	button.classList.toggle("highlight");
	setTimeout(() => {
		button.classList.toggle("highlight");
	}, 1000);
}

let globalRows = [];

function processInput() {
	// Note: .textContent will return an empty string
	const [leftArea, rightArea] = [...document.getElementById("textarea-container").children].map(
		(node) => node.value.trim(),
	);

	const systemJobs = mapJobsSystem(parseTable(leftArea));
	const systemRowCount = countRows(systemJobs);

	if (systemRowCount <= 0) return;

	// Don't map the jobs directly since we care about the duplicate count, empty count etc.
	const sheetRows = parseTable(rightArea);
	const sheetJobs = mapJobsSheet(sheetRows);

	const tbody = document.body.getElementsByTagName("tbody")[0];
	adjustTBodySize(tbody, systemRowCount);

	const combinedJobs = combine(systemJobs, sheetJobs, systemRowCount, sheetRows.length);
	const combinedJobsSorted = sortArrayWithTime(combinedJobs, 7);
	populateTBody(tbody, combinedJobsSorted);

	const tableContainer = document.getElementById("table-container");
	tableContainer.style.display = "flex";

	const rowCountContainer = document.getElementById("row-count-container");
	const rowCountNode = rowCountContainer.firstElementChild;
	rowCountNode.textContent = `Row count: ${systemRowCount}`;
	rowCountContainer.style.display = "flex";

	globalRows = combinedJobsSorted;
}

function copyRows(button) {
	if (globalRows.length === 0) return;

	copy(globalRows.map((row) => row.join("\t")).join("\n"));
	showSuccessState(button, "Copy");
}

// Check if window is defined (i.e., running in a browser environment)
if (typeof window !== "undefined") {
	window.processInput = processInput;
	window.copyRows = copyRows;
}
