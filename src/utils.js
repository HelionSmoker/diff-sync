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

export function sortByTime(arr, pos) {
	// Note: .slice() to create a new array
	return arr.slice().sort((a, b) => {
		const timeA = a[pos] === "" ? "" : new Date("1970-01-01 " + a[pos]);
		const timeB = b[pos] === "" ? "" : new Date("1970-01-01 " + b[pos]);
		return timeA - timeB;
	});
}

export function formatDate(dateObj) {
	return dateObj.toLocaleDateString("en-US", {
		month: "2-digit",
		day: "2-digit",
	});
}

export function findMostFrequent(freqMap) {
	const sortedEntries = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
	return sortedEntries.length > 0 ? sortedEntries[0][0] : undefined;
}

export function toTitleCase(str) {
	return str.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

export function calcMaskLength(rowCount) {
	return rowCount < 248 ? 250 : (Math.ceil(rowCount / 10) + 1) * 10;
}

export function countRows(obj) {
	return Object.values(obj).reduce((acc, value) => acc + Object.keys(value).length, 0);
}
