import { mapJobsSystem, mapJobsSheet, parseTable, combineJobs, padJobsArray } from "./jobs.js";
import { copy, sortByTime, countRows } from "./utils.js";
import { adjustTBodySize, populateTBody } from "./table.js";
import { DEMO_SYS, DEMO_SHEET } from "./demo-data.js";

function showButtonStatus(button, nodeClass) {
	button.classList.toggle(nodeClass);
	setTimeout(() => {
		button.classList.toggle(nodeClass);
	}, 1000);
}

let sysInputArea;
let sheetInputArea;
let paddedRows = [];

function processInput() {
	const systemJobs = mapJobsSystem(parseTable(sysInputArea.value));
	const systemRowCount = countRows(systemJobs);

	if (systemRowCount <= 0) return "failure";

	// Don't map the jobs directly since we care about the duplicate count, empty count etc.
	const sheetRows = parseTable(sheetInputArea.value);
	const [sheetJobs, globalDate] = mapJobsSheet(sheetRows);

	const tbody = document.body.getElementsByTagName("tbody")[0];
	adjustTBodySize(tbody, systemRowCount);

	const combinedJobs = sortByTime(combineJobs(systemJobs, sheetJobs, globalDate), 7);
	populateTBody(tbody, combinedJobs);

	const tableContainer = document.getElementById("table-container");
	tableContainer.style.display = "flex";

	const rowCountContainer = document.getElementById("row-count-container");
	const rowCountNode = rowCountContainer.firstElementChild;
	rowCountNode.textContent = `Row Count: ${systemRowCount}`;
	rowCountContainer.style.display = "flex";

	paddedRows = padJobsArray(combinedJobs, systemRowCount, sheetRows.length, globalDate);

	return "success";
}

function copyRows() {
	if (paddedRows.length === 0) return "failure";

	copy(paddedRows.map((row) => row.join("\t")).join("\n"));
	return "success";
}

function showDemo() {
	sysInputArea.value = DEMO_SYS;
	sheetInputArea.value = DEMO_SHEET;

	return processInput();
}

// Check if window is defined (i.e., running in a browser environment)
if (typeof window !== "undefined") {
	sysInputArea = document.getElementById("sys-input");
	sheetInputArea = document.getElementById("sheet-input");

	window.showButtonStatus = showButtonStatus;
	window.processInput = processInput;
	window.copyRows = copyRows;
	window.showDemo = showDemo;
}
