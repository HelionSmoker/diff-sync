export class Status {
	constructor(status, msg = "") {
		this.status = status.toLowerCase().trim();
		this.msg = msg.trim();

		if (status === "failure") {
			alert(msg);
		}
	}
}

export function parseCSV(csvText) {
	return new Promise((resolve, reject) => {
		Papa.parse(csvText, {
			delimiter: "\t",
			newline: "\n",
			quoteChar: '"',
			escapeChar: '"',
			skipEmptyLines: "greedy",
			header: true,
			complete: function (results) {
				resolve(results.data);
			},
			error: function (err) {
				console.error("Error parsing CSV:", err);
				reject(err);
			},
		});
	});
}

export function copy(text) {
	navigator.clipboard.writeText(text).then(
		function () {
			console.log(`Copied: ${text}`);
		},
		function (err) {
			console.error("Could not copy text: ", err);
		},
	);
}

export function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}

export function formatDate(dateObj) {
	try {
		return dateObj.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
		});
	} catch (e) {
		console.error(`Cannot format the date: ${dateObj}`, e);
		return undefined;
	}
}

export function formatTime(dateObj) {
	try {
		return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(
			dateObj,
		);
	} catch (e) {
		console.error(`Cannot format the date: ${dateObj}`, e);
		return undefined;
	}
}

export function findMostFrequent(freqMap) {
	if (freqMap.length == 0) return undefined;
	return Object.entries(freqMap).sort((a, b) => b[1] - a[1])[0][0];
}

export function capitalizeString(s) {
	return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

export function countGrandChildren(obj) {
	return Object.values(obj).reduce((acc, value) => acc + Object.keys(value).length, 0);
}

export function convertArrayToCSV(array) {
	return Papa.unparse(array, {
		delimiter: "\t",
		newline: "\n",
	});
}
