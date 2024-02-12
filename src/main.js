import { ShiftDisplay, showButtonStatus } from "./display.js";
import { DEMO_SYSTEM, DEMO_SHEET } from "./data.js";
import { ShiftProcessor } from "./shifts.js";

async function initializeApp() {
	// Check if we're running in a browser environment
	if (typeof window !== "undefined") {
		const systemInputArea = document.getElementById("system-input");
		const sheetInputArea = document.getElementById("sheet-input");
		const tbody = document.getElementById("combined-shifts").children[1];
		const tableContainer = document.getElementById("combined-shifts-container");
		const rowCountContainer = document.getElementById("row-count-container");

		const shiftProcessor = new ShiftProcessor(systemInputArea, sheetInputArea);
		const shiftDisplay = new ShiftDisplay(tbody, tableContainer, rowCountContainer);

		bindEventListeners(shiftProcessor, shiftDisplay);
	}
}

async function updateUIAfterProcessing(button, status, shiftDisplay, shiftProcessor) {
	if (status === "success") {
		shiftProcessor.sortByCol(7);
		shiftDisplay.display(shiftProcessor.shifts);
	}
	showButtonStatus(button, status);
}

function bindEventListeners(shiftProcessor, shiftDisplay) {
	document.getElementById("sync-data-button").addEventListener("click", async function () {
		const status = await shiftProcessor.processShifts();
		updateUIAfterProcessing(this, status.status, shiftDisplay, shiftProcessor);
	});

	document.getElementById("copy-data-button").addEventListener("click", async function () {
		const status = await shiftProcessor.copyShifts();
		showButtonStatus(this, status.status);
	});

	document.getElementById("show-demo-button").addEventListener("click", async function () {
		shiftProcessor.systemInputArea.value = DEMO_SYSTEM;
		shiftProcessor.sheetInputArea.value = DEMO_SHEET;

		const status = await shiftProcessor.processShifts();
		updateUIAfterProcessing(this, status.status, shiftDisplay, shiftProcessor);
	});

	let prevSortColumn = 7; // Default sorting on the 'Start Time' column
	const headerCells = [...document.querySelector("#combined-shifts>thead>tr").children];

	headerCells.forEach((headerCell, i) => {
		const sortIcon = headerCell.querySelector("i");
		if (i !== prevSortColumn) {
			// Hide other icons initially. Just to be sure.
			sortIcon.classList.add("hidden");
		}

		headerCell.onclick = () => {
			if (prevSortColumn !== i) {
				// Hide the previous icon and reset its orientation
				const prevIcon = headerCells[prevSortColumn].querySelector("i");
				prevIcon.classList.add("hidden");
				prevIcon.style.transform = "rotate(0deg)"; // Reset to default orientation

				sortIcon.classList.remove("hidden");
			} else {
				sortIcon.style.transform = sortIcon.style.transform === "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
			}
			console.log(shiftProcessor.shifts)
			shiftProcessor.sortByCol(i);
			shiftDisplay.display(shiftProcessor.shifts);

			prevSortColumn = i;
		};
	});
}

initializeApp();
