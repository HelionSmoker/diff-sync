import {
	Status,
	parseCSV,
	unparseCSV,
	copy,
	capitalizeString,
	isValidDate,
	countGrandChildren,
	findMostFrequent,
	formatDateTime,
} from "./utils.js";
import {
	SYSTEM_SHIFTS_HEADER,
	SHEET_SHIFTS_HEADER,
	DATE_FMT_OPTIONS,
	TIME_FMT_OPTIONS,
	DEFAULT_YEAR,
} from "./demo-data.js";

export const COLUMN_METADATA = {
	"Start Date": { parser: parseDate, type: "string" },
	"Confirmation": { parser: parseConf, type: "string" },
	"Worker Name": { parser: parseName, type: "string" },
	"Vendor": { parser: parseVendor, type: "string" },
	"Upload Period": { parser: parseUploadPeriod, type: "string" },
	"Source": { parser: parseSource, type: "string" },
	"Comment": { parser: parseComment, type: "string" },
	"Start Time": { parser: parseTime, type: "time" },
};
const MASK_SIZE = 250;
const HEADER_SIZE = 2;

export class ShiftProcessor {
	constructor(systemInputArea, sheetInputArea) {
		this.shifts = [];
		this.fmtShifts = [];
		this.shiftsDate;

		this.systemInputArea = systemInputArea;
		this.sheetInputArea = sheetInputArea;

		this.currentSortColumn = null;
	}

	async processShifts() {
		const systemCSV = parseCSV(
			`${SYSTEM_SHIFTS_HEADER.join("\t")}\n${this.systemInputArea.value}`,
		);
		const systemData = await this.processCSV(systemCSV, SYSTEM_SHIFTS_HEADER);
		const sheetCSV = parseCSV(
			`${SHEET_SHIFTS_HEADER.join("\t")}\n${this.sheetInputArea.value}`,
		);
		const sheetData = await this.processCSV(sheetCSV, SHEET_SHIFTS_HEADER);

		if (this.systemShiftCount <= 0) return new Status("failure", "No system shifts found.");

		this.shiftsDate = this.getShiftsDate(sheetData);
		this.shifts = this.combineShifts(systemData, sheetData);

		return new Status("success");
	}

	async processCSV(csv, additionalFields) {
		return csv.then((map) => {
			let dataObject = {};
			for (const row of map.values()) {
				const workerName = parseName(row["Worker Name"]);

				if (!dataObject[workerName]) {
					dataObject[workerName] = [];
				} else {
					// Check for duplicates only if the worker name is not empty
					// We need this for jobs that don't have a worker assigned yet

					// prettier-ignore
					if (workerName !== "" && dataObject[workerName].some((entry) =>
						entry["Confirmation"][0] === parseConf(row["Confirmation"]) &&
						entry["Vendor"][0] === parseVendor(row["Vendor"]) &&
						entry["Start Time"][0] === parseTime(row["Start Time"]))
					) continue;
				}

				let entry = {};
				for (const field of additionalFields) {
					if (field in entry) continue;

					// Store both the parse value and the original value for
					// diffing purposes later on
					entry[field] = [COLUMN_METADATA[field].parser(row[field]), row[field]];
				}

				dataObject[workerName].push(entry);
			}
			return dataObject;
		});
	}

	combineShifts(systemData, sheetData) {
		let result = [];

		for (let [worker, shifts] of Object.entries(systemData)) {
			shifts.forEach((shift) => {
				let row = [this.shiftsDate, shift["Confirmation"][0], shift["Vendor"][0], worker];

				const sheetCounterPart = sheetData[worker]
					? sheetData[worker].find(
							(sheetShift) =>
								shift["Vendor"][0] === sheetShift["Vendor"][0] &&
								shift["Start Time"][0] === sheetShift["Start Time"][0],
					  )
					: null;

				if (sheetCounterPart) {
					row = row.concat(
						sheetCounterPart["Upload Period"][0],
						sheetCounterPart["Source"][0],
						sheetCounterPart["Comment"][0],
					);
				} else {
					row = row.concat("", "App", "");
				}
				row.push(
					new Date(
						`${this.shiftsDate}/${DEFAULT_YEAR} ${shift["Start Time"][0]}`,
					).getTime(),
				);
				result.push(row);
			});
		}
		return result;
	}

	getShiftsDate(sheetData) {
		let dateCounts = {};

		for (let shifts of Object.values(sheetData)) {
			for (let shift of Object.values(shifts)) {
				dateCounts[shift["Start Date"][0]] = (dateCounts[shift["Start Date"][0]] || 0) + 1;
			}
		}

		const currentDate = formatDateTime(new Date(), DATE_FMT_OPTIONS);
		if (Object.keys(dateCounts).length == 0) return currentDate;

		const mostFreqDate = new Date(Number(findMostFrequent(dateCounts)));
		const fmtDate = formatDateTime(mostFreqDate, DATE_FMT_OPTIONS);
		return fmtDate !== undefined ? fmtDate : currentDate;
	}

	padShifts() {
		// Avoid modifying the original array
		let result = [...this.getShifts];

		const systemShiftCount = countGrandChildren(systemData);
		const sheetShiftCount = Object.keys(sheetData).length; //todo, not from map

		// Adjusting for header offset
		const systemMaskLength = this.calcMaskLength(systemShiftCount) - 2;
		const sheetMaskLength = this.calcMaskLength(sheetShiftCount) - 2;

		const systemPadRows = Math.max(0, systemMaskLength - result.length);
		result = result.concat(
			Array(systemPadRows).fill([this.shiftsDate, "", "", "", "", "App", "", ""]),
		);

		const sheetPadRows = Math.max(0, sheetMaskLength - systemMaskLength);
		result = result.concat(Array(sheetPadRows).fill(["", "", "", "", "", "", "", ""]));

		return result;
	}

	calcMaskLength(shiftCount) {
		return shiftCount < MASK_SIZE - HEADER_SIZE
			? MASK_SIZE
			: (Math.ceil(shiftCount / 10) + 1) * 10;
	}

	sortByCols(colIndexes) {
		// First column to be sorted is most significant
		if (this.currentSortColumn === colIndexes[0]) {
			this.shifts.reverse();
		} else {
			this.shifts.sort((a, b) => {
				for (let colIndex of colIndexes) {
					let valA = a[colIndex];
					let valB = b[colIndex];

					// Handle empty strings to place them at the end or start based on sort orientation
					if (valA === "" && valB === "") return 0;
					if (valA === "") return 1;
					if (valB === "") return -1;

					if (valA < valB) return -1;
					if (valA > valB) return 1;
				}
				return 0;
			});
		}

		this.currentSortColumn = colIndexes[0]; // Keep track of the current sort columns
	}

	getShifts() {
		const colNames = Object.keys(COLUMN_METADATA);

		const formattedShifts = this.shifts.map((row) =>
			row.map((value, index) => {
				const colData = COLUMN_METADATA[colNames[index]].type;
				if (colData === "time") {
					return formatDateTime(new Date(value), TIME_FMT_OPTIONS);
				}
				return value;
			}),
		);

		return formattedShifts;
	}

	copyShifts() {
		if (this.systemShiftCount === 0)
			return new Status(
				"failure",
				"System shifts haven't been processes, or no system shifts were found.",
			);

		copy(unparseCSV(this.padShifts()));

		return new Status("success");
	}
}

export function parseDate(dateStr) {
	if (dateStr === "") return undefined;

	// Keep only alphanumeric, space, '.', or '/'.
	const formattedDate = dateStr.replace(/[^a-zA-Z0-9 ./]/g, "");
	const parts = formattedDate.split(/[\/\s-.]/).filter(Boolean); // Split and filter empty strings

	const currentDate = new Date();
	let userProvidedDate;

	switch (parts.length) {
		case 1:
			// Assume the user entered only the day
			userProvidedDate = new Date(DEFAULT_YEAR, currentDate.getMonth(), parts[0]);
			break;
		case 2:
			// Assume the user entered only the month and day
			userProvidedDate = new Date(`${DEFAULT_YEAR} ${parts[0]} ${parts[1]}`);
			break;
		case 3:
			// Directly use the formattedDate, assuming MM/DD/YYYY or similar
			userProvidedDate = new Date(`${parts[0]} ${parts[1]} ${parts[2]}`);
			break;
		default:
			console.error(`Invalid date format: ${dateStr}`);
			return undefined;
	}

	if (isValidDate(userProvidedDate)) {
		return userProvidedDate.getTime();
	} else {
		console.error(`Invalid date: ${userProvidedDate}`);
		return undefined;
	}
}

const CONF_LONG_THRESHOLD = 10 ** 8;

export function parseConf(conf) {
	const confNum = conf.replace(/\D/g, ""); // Keep only the digits
	if (confNum.length === 0) return undefined;

	const confInt = parseInt(confNum, 10);
	if (confInt >= CONF_LONG_THRESHOLD * 10) return undefined;

	return confInt > CONF_LONG_THRESHOLD ? confInt - CONF_LONG_THRESHOLD : confInt;
}

export function parseVendor(vendor) {
	// Keep only alphanumerical and spaces
	return vendor
		.replace(/[^a-zA-Z0-9\s]/g, "")
		.trim()
		.replace(/ +/g, " "); // Remove multiple consecutive spaces
}

const NAME_DIACRITICS_PATTERN = /[àáâãäåæçèéêëìíîïñòóôõöøùúûüýÿăąćčđėęěğıįłńňœřşšţťūůűųźž]/;
const NAME_SPECIAL_CHARS_PATTERN = /[ \-.`'–—]/;

export function parseName(name) {
	const lcName = name.toLowerCase();
	let result = "";
	let word = "";
	let prevChar = "";

	for (let i = 0; i < lcName.length; i++) {
		const char = lcName[i];
		if (NAME_DIACRITICS_PATTERN.test(char) || /^[a-z]$/.test(char)) {
			word += char;
		} else if (NAME_SPECIAL_CHARS_PATTERN.test(char)) {
			result += capitalizeString(word);
			word = "";
			if (char !== prevChar) {
				result += char;
			}
		}
		prevChar = char;
	}
	result += capitalizeString(word);

	return result.trim();
}

export function parseUploadPeriod(uploadPeriod) {
	uploadPeriod = uploadPeriod.toLowerCase().replace(/[^a-z]/g, ""); // Keep only alpha

	return ["before", "during"].includes(uploadPeriod) ? uploadPeriod : "";
}

export function parseSource(source) {
	return source.toLowerCase().replace(/[^a-z]/g, "") === "email" ? "Email" : "App"; // Keep only alpha
}

export function parseComment(comment) {
	return comment
		.split(" ")
		.filter(Boolean)
		.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
		.join(" ");
}

export function parseTime(timeStr) {
	if (timeStr === "") return undefined;

	// Keep only digits, ':' and the letters 'A', 'P', and 'M'.
	// Then, match any digit followed by 0 or more whitespace followed by either 'A' or 'P'
	// and replace it with the digit, a whitespace and the letter. We need a whitespace
	// between the hour and the meridian for date parsing later on.

	return timeStr
		.toUpperCase()
		.replace(/[^0-9:APM]/g, "")
		.replace(/(\d)\s*A/g, "$1 A")
		.replace(/(\d)\s*P/g, "$1 P")
}
