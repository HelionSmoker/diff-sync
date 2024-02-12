
export class ShiftDisplay {
	constructor(tbody, tableContainer, rowCountContainer) {
		this.tbody = tbody;
		this.tableContainer = tableContainer;
		this.rowCountContainer = rowCountContainer;

		this.shifts = [];


	}

	display(shifts) {
		this.shifts = shifts;

		this.adjustTBodySize();
		this.populateTBody();

		this.tableContainer.style.display = "flex";
	}

	adjustTBodySize() {
		const tableRows = this.tbody.children;
		const sizeDiff = this.shifts.length - tableRows.length;

		if (sizeDiff < 0) {
			this.removeTableRows(Math.abs(sizeDiff), tableRows);
		} else if (sizeDiff > 0) {
			this.addTableRows(sizeDiff);
		}
	}

	addTableRows(rowCount, cellCount = 8) {
		const fragment = document.createDocumentFragment();

		for (let i = 0; i < rowCount; i++) {
			const rowNode = document.createElement("tr");

			for (let j = 0; j < cellCount; j++) {
				const cellNode = document.createElement("td");
				rowNode.appendChild(cellNode);
			}

			fragment.appendChild(rowNode);
		}

		this.tbody.appendChild(fragment);
	}

	populateTBody() {
		const tableRows = Array.from(this.tbody.children);

		tableRows.forEach((rowNode, i) => {
			const cells = Array.from(rowNode.children);
			cells.forEach((cellNode, j) => {
				cellNode.textContent = this.shifts[i][j];
			});
		});
	}

	removeTableRows(rowCount, tableRows) {
		for (let i = 0; i < rowCount; i++) {
			this.tbody.removeChild(tableRows[i]);
		}
	}



	updateRowCounter() {
		this.rowCountContainer.style.display = "flex";
		this.rowCountContainer.textContent = `Row Count: ${this.shifts.length}`;
	}
}

export function showButtonStatus(button, nodeClass) {
	button.classList.toggle(nodeClass);
	setTimeout(() => {
		button.classList.toggle(nodeClass);
	}, 1000);
}
