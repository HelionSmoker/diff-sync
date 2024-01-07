export function adjustTBodySize(tbody, targetSize) {
	const tableRows = tbody.children;
	const sizeDiff = targetSize - tableRows.length;

	if (sizeDiff < 0) {
		removeTableRows(tbody, Math.abs(sizeDiff), tableRows);
	} else if (sizeDiff > 0) {
		addTableRows(tbody, sizeDiff);
	}
}

export function addTableRows(tbody, rowCount, cellCount = 8) {
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

export function removeTableRows(tbody, rowCount, tableRows) {
	for (let i = 0; i < rowCount; i++) {
		tbody.removeChild(tableRows[i]);
	}
}

export function populateTBody(tbody, array) {
	const tableRows = Array.from(tbody.children);

	tableRows.forEach((rowNode, i) => {
		const cells = Array.from(rowNode.children);
		cells.forEach((cellNode, j) => {
			cellNode.textContent = array[i][j];
		});
	});
}
