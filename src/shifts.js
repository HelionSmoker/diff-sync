import { capitalizeString, isValidDate, copy } from "./utils.js";
import {
	Status,
	parseCSV,
	convertArrayToCSV,
	countGrandChildren,
	formatDate,
	formatTime,
	findMostFrequent,
} from "./utils.js";
import { SYSTEM_SHIFTS_HEADER, SHEET_SHIFTS_HEADER } from "./data.js";

const PARSE_FUNCS = {
	"Start Date": parseDate,
	"Confirmation": parseConf,
	"Worker Name": parseName,
	"Vendor": parseVendor,
	"Upload Period": parseUploadPeriod,
	"Source": parseSource,
	"Comment": parseComment,
	"Start Time": parseTime,
};
const MASK_SIZE = 250;
const HEADER_SIZE = 2;

export class ShiftProcessor {
	constructor(systemInputArea, sheetInputArea) {
		this.shifts = [];
		this.paddedShifts = [];

		this.systemInputArea = systemInputArea;
		this.sheetInputArea = sheetInputArea;

		this.systemShiftCount = 0;
		this.sheetShiftCount = 0;
		this.shiftsDate;

		this.currentSortColumn = null;
	}

	async processShifts() {
		const systemCSV = parseCSV(
			`${SYSTEM_SHIFTS_HEADER.join("\t")}\n${this.systemInputArea.value}`,
		);
		console.log(JSON.stringify(await systemCSV));
		const systemData = await this.processCSV(systemCSV, SYSTEM_SHIFTS_HEADER);

		const sheetCSV = parseCSV(
			`${SHEET_SHIFTS_HEADER.join("\t")}\n${this.sheetInputArea.value}`,
		);
		const sheetData = await this.processCSV(sheetCSV, SHEET_SHIFTS_HEADER);
		// console.log(JSON.stringify(systemData), '\n\n', JSON.stringify(sheetData));
		this.systemShiftCount = countGrandChildren(systemData);
		this.sheetShiftCount = Object.keys(sheetData).length; //todo, not from map

		if (this.systemShiftCount <= 0) return new Status("failure", "No system shifts found.");

		this.shiftsDate = this.getShiftsDate(sheetData);
		this.shifts = this.combineShifts(systemData, sheetData);
		this.paddedShifts = this.padShifts(this.shifts);

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
					entry[field] = [PARSE_FUNCS[field](row[field]), row[field]];
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

				// Use `find` instead of `forEach` to get the first matching sheet shift
				// prettier-ignore
				const sheetCounterPart = sheetData[worker] ?
					sheetData[worker].find((sheetShift) => shift["Vendor"][0] === sheetShift["Vendor"][0] &&
						shift["Start Time"][0] === sheetShift["Start Time"][0])
					: null;

				if (sheetCounterPart) {
					// Correctly access `sheetCounterPart` properties instead of `sheetData[worker]`
					row = row.concat(
						sheetCounterPart["Upload Period"][0],
						sheetCounterPart["Source"][0],
						sheetCounterPart["Comment"][0],
					);
				} else {
					row = row.concat("", "App", ""); // Correctly use `concat` for arrays
				}
				row.push(shift["Start Time"][0]); // Append start time at the end
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

		const currentDate = formatDate(new Date());
		if (Object.keys(dateCounts).length == 0) return currentDate;

		// DateObj gets converted to string when added to Hashmap
		const fmtDate = formatDate(new Date(findMostFrequent(dateCounts)));
		return fmtDate !== undefined ? fmtDate : currentDate;
	}

	padShifts(shifts) {
		// Avoid modifying the original array
		let result = [...shifts];

		// Adjusting for header offset
		const systemMaskLength = this.calcMaskLength(this.systemShiftCount) - 2;
		const sheetMaskLength = this.calcMaskLength(this.sheetShiftCount) - 2;

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

	sortByCol(colIndex) {
		if (this.currentSortColumn === colIndex) {
			this.shifts.reverse();
			this.paddedShifts = this.padShifts(this.shifts);
			return;
		}

		switch (colIndex) {
			case 7:
				this.shifts.map(shift => shift[7] = new Date("2020-01-01 " + shift[7]))
				this.shifts.sort((a, b) => a[7] - b[7])
				this.shifts.map(shift => shift[7] = formatTime(shift[7]))
				break;
			case 1:
				this.shifts.sort();
				break;
			default:
				this.shifts.sort((a, b) => {
					const valA = a[colIndex];
					const valB = b[colIndex];

					// Handle empty strings for ascending and descending sort
					if (valA === "" && valB === "") return 0;
					if (valA === "") return 1;
					if (valB === "") return -1;

					if (valA < valB) return -1;
					if (valA > valB) return 1;
					return 0;
				});
		}

		this.paddedShifts = this.padShifts(this.shifts);
		this.currentSortColumn = colIndex;
	}

	copyShifts() {
		if (this.systemShiftCount === 0)
			return new Status(
				"failure",
				"System shifts haven't been processes, or no system shifts were found.",
			);

		copy(convertArrayToCSV(this.paddedShifts));

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
			userProvidedDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				parts[0],
			);
			break;
		case 2:
			// Assume the user entered only the month and day
			userProvidedDate = new Date(`${currentDate.getFullYear()} ${parts[0]} ${parts[1]}`);
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
		return userProvidedDate;
	} else {
		console.error(`Invalid date: ${userProvidedDate}`);
		return undefined;
	}
}

const CONF_LONG_THRESHOLD = 10 ** 8;

export function parseConf(conf) {
	const confNum = conf.replace(/\D/g, ""); // Keep only the digits
	if (confNum.length === 0) return 0;

	const confInt = parseInt(confNum, 10);
	if (confInt >= CONF_LONG_THRESHOLD * 10) return 0;

	return confInt > CONF_LONG_THRESHOLD ? confInt - CONF_LONG_THRESHOLD : confInt;
}

export function parseVendor(vendor) {
	// Keep only alphanumerical and spaces
	return vendor.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/ +/g, " "); // Remove multiple consecutive spaces
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
	return comment.split(' ').filter(Boolean).map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
}

export function parseTime(timeStr) {
	if (timeStr === "") return undefined;
	const fmtTime = timeStr.toUpperCase().replace(/[^0-9:\s]/g, ""); // Keep only digits and ':'
	return formatTime(new Date("2020-01-01 " + fmtTime));
}
