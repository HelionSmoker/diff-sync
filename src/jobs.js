import { toPascalCase, formatDate, findMostFrequent, calcMaskLength } from "./utils.js";

export function parseConf(conf) {
	let confInt = parseInt(conf.replace(/\D/g, "")); // Keep only the digits
	confInt = isNaN(confInt) ? 0 : confInt;

	// Handle both formats: '100064706' and '64706' -> 64706
	return confInt > 10 ** 8 ? confInt - 10 ** 8 : confInt;
}

export function parseName(name) {
	name = name
		.replace(/[^a-zA-Z\s]/g, "") // Keep only alpha and space
		.trim()
		.replace(/ +/g, " "); // Remove multiple consecutive spaces
	return toPascalCase(name);
}

export function parseDate(dateStr) {
	if (dateStr === "") return undefined;

	const currentDate = new Date(); // For current year
	const formattedDate = dateStr.replace(/[^a-zA-Z0-9 ./]/g, ""); // Keep only alphanumeric, space, '.' or '/'.
	const parts = formattedDate.split(/[\/\s-.]/).filter((part) => part !== ""); // Split on spaces, slashes, hyphens or periods
	let userProvidedDate;

	try {
		switch (parts.length) {
			case 1:
				// Assume the user entered only the day
				userProvidedDate = new Date(
					`${currentDate.getMonth()} ${parts[0]} ${currentDate.getFullYear()}`,
				);
				break;
			case 2:
				// Assume the user entered only the month and day
				userProvidedDate = new Date(`${parts.join(" ")} ${currentDate.getFullYear()}`);
				break;

			case 3:
				// Assume the user entered the full date
				userProvidedDate = new Date(formattedDate);
				break;
			default:
				throw new Error(`Invalid date format: ${dateStr}`);
		}

		if (!isNaN(userProvidedDate)) {
			return userProvidedDate;
		} else {
			throw new Error(`Invalid date format: ${dateStr}`);
		}
	} catch (error) {
		console.error("Error parsing date:", error.message);
	}

	return undefined;
}

export function parseTime(timeStr) {
	// Keep only digits, ':' and the letters 'a', 'p', and 'm'.
	return timeStr.toLowerCase().replace(/[^0-9:apm]/g, "");
}

export function parseVendor(vendor) {
	// Keep only alphanums and spaces
	return vendor.replace(/[^a-zA-Z0-9\s]/g, "").replace(/ +/g, " "); // Remove multiple consecutive spaces
}

export function parseUploadPeriod(uploadPeriod) {
	uploadPeriod = uploadPeriod.toLowerCase().replace(/[^a-z]/g, ""); // Keep only alpha

	return ["before", "during"].includes(uploadPeriod) ? uploadPeriod : "";
}

export function parseSource(source) {
	return source.toLowerCase().replace(/[^a-z]/g, "") === "email" ? "Email" : "App"; // Keep only alpha
}

export function parseTable(tableStr, rowSize) {
	/*
	Google Sheets will apply these formatting rules when copying a table:
	1. Separate the table cells with a tab char
	2. Separate the table rows with a newline char
	3.1 If the cell contains a newline char or tab, wrap the entire cell in double quotes
		('text1\ntext2' -> '"text1\ntext2"')
	3.2 If there are quotes in the original cell, escape those quotes with other quotes 
		('"text"' -> '""text""')
	*/

	if (tableStr.length === 0) return [[""]];

	// We need a final newline char to push the last line
	if (!tableStr.endsWith("\n")) tableStr += "\n";

	let parsedTable = [];
	let currentRow = [];
	let currentCell = "";
	let prevChar = false;
	let inQuotes = false;

	for (var char of tableStr) {
		if (char === '"' && currentCell === "") {
			inQuotes = true;
		}

		if (char !== "\t" && char !== "\n") {
			currentCell += char;
			prevChar = char;
			continue;
		}

		if (char === "\t" || (currentCell.slice(-1) === '"' && currentCell.slice(-2) !== '""'))
			inQuotes = false;

		if (inQuotes) {
			currentCell += char;
			continue;
		}

		if (
			currentCell.includes("\n") &&
			(!currentCell.startsWith('"') || !currentCell.endsWith('"'))
		) {
			currentRow.concat(currentCell.split("\n").map((cell) => parseCell(cell)));
		} else {
			currentRow.push(parseCell(currentCell));
			currentCell = "";
		}

		if (char === "\n") {
			parsedTable.push(currentRow);
			currentRow = [];
		}
	}

	// Add remaining values after the loop
	let finalCells = [];
	if (currentCell.length > 0) {
		if (currentCell.includes("\n")) {
			finalCells = currentCell
				.trim()
				.split("\n")
				.map((cell) => parseCell(cell));

			if (finalCells.length > 1) {
				currentRow = currentRow.concat(finalCells[0]);
			} else {
				currentRow = currentRow.concat(finalCells);
			}
		} else {
			currentRow.push(parseCell(currentCell));
		}
	}

	if (currentRow.length > 0) parsedTable.push(currentRow);
	if (finalCells.length > 1) parsedTable.push(finalCells.slice(1));

	return parsedTable;
}

export function parseCell(cell) {
	// Remove trailing newlines that might
	let fmtCell = cell.replaceAll("\t", "").trim();

	// Replace all whitespace with a regular space and escaped quotes with
	// regular quotes
	if (fmtCell.startsWith('"') && fmtCell.endsWith('"') && fmtCell.includes("\n")) {
		fmtCell = fmtCell.slice(1, -1).replace(/\s/g, " ").replaceAll('""', '"');
	}
	return fmtCell.trim();
}

export function mapJobsSystem(rows) {
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

		if (workerName.trim() !== "") workerName = parseName(workerName);

		result[conf] = {
			...(result[conf] || {}),
			[workerName]: [parseVendor(vendor), parseTime(start)],
		};
	});

	return result;
}

export function mapJobsSheet(rows) {
	let result = {};
	let dateToCount = {};

	rows.forEach((cols) => {
		// Disregard empty rows
		if (cols[1] === "" || cols.length < 8) return;

		let [date, conf, _vendor, workerName, uploadPeriod, source, comment] = cols;

		date = parseDate(date);
		if (date !== undefined) {
			date = formatDate(date);
			dateToCount[date] = (dateToCount[date] ?? 0) + 1;
		}

		conf = parseConf(conf);
		comment.replace(/ +/g, " "); // Remove multiple consecutive spaces

		result[conf] = {
			...(result[conf] || {}),
			[parseName(workerName)]: [
				parseUploadPeriod(uploadPeriod),
				parseSource(source),
				comment,
			],
		};
	});

	const globalDate = findMostFrequent(dateToCount) || formatDate(new Date());

	return [result, globalDate];
}

export function combineJobs(system, sheet, globalDate) {
	let result = [];

	for (let conf in system) {
		for (let workerName in system[conf]) {
			let manualValues = ["", "App", ""];
			if (conf in sheet && workerName in sheet[conf]) {
				manualValues = sheet[conf][workerName];
			}
			result.push([
				globalDate,
				conf,
				system[conf][workerName][0],
				workerName,
				...manualValues,
				system[conf][workerName][1],
			]);
		}
	}

	return result;
}

export function padJobsArray(jobs, systemRowCount, sheetRowCount, globalDate) {
	let result = jobs;

	// Subtract 2 due to header
	const systemMaskLength = calcMaskLength(systemRowCount) - 2;
	const sheetMaskLength = calcMaskLength(sheetRowCount) - 2;

	result = result.concat(
		Array(systemMaskLength - result.length).fill([globalDate, "", "", "", "", "App", "", ""]),
	);

	// Create an anchor point in Sheets so deleting these rows is easier
	if (sheetMaskLength > systemMaskLength) {
		result = result.concat(
			Array(sheetMaskLength - result.length).fill(["", "", "", "", "", "", "", ""]),
		);
	}

	return result;
}
