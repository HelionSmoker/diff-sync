import chai from "chai";
const { assert } = chai;

import { parseTable } from "../main.js";

describe("Google Sheets Parser Single Line with Regular Text", function () {
	it("an empty string", () => {
		const str = "";
		const out = [[""]];

		assert.deepEqual(parseTable(str), out);
	});

	it("a single cell", () => {
		const str = "text\n";
		const out = [["text"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("multiple cells", () => {
		const str = `text1\ttext2\ttext3\n`;
		const out = [["text1", "text2", "text3"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("multiple cells without newline char", () => {
		const str = `text1\ttext2\ttext3`;
		const out = [["text1", "text2", "text3"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("an empty cell", () => {
		const str = `text1\t\ttext2\n`;
		const out = [["text1", "", "text2"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("an empty final cell", () => {
		const str = `text1\ttext2\t\n`;
		const out = [["text1", "text2", ""]];

		assert.deepEqual(parseTable(str), out);
	});

	it("an empty final cell without newline char", () => {
		const str = `text1\ttext2\t`;
		const out = [["text1", "text2", ""]];

		assert.deepEqual(parseTable(str), out);
	});

	it("multiple empty cells", () => {
		const str = `\t\ttext\n`;
		const out = [["", "", "text"]];

		assert.deepEqual(parseTable(str), out);
	});
});

describe("Google Sheets Parser Single Line with Quoted Text", function () {
	it("a cell containing two double quotes", () => {
		const str = `""`;
		const out = [['""']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes and a newline", () => {
		// Since Google Sheets does not allow the presence of a newline char at the
		// beginning of the cell, the following string is not the result of a copy,
		// but rather the original values of the cells.

		const str = `"\n"`;
		const out = [['"'], ['"']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes, a newline, and end text", () => {
		// See explanation above
		const str = `"\ntext1"`;
		const out = [['"'], ['text1"']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes, a newline, and start text", () => {
		// Trailing newlines are allowed by Google Sheets, but we trim them.
		const str = `"text1\n"`;
		const out = [["text1"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes, multiple newlines, and start text", () => {
		// See explanation above
		const str = `"text1\n\n\n\n"`;
		const out = [["text1"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes and text", () => {
		const str = `"text"`;
		const out = [['"text"']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes, a newline and text", () => {
		const str = `"text1\ntext2`;
		const out = [['"text1'], ['text2']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes, a tab and text", () => {
		const str = `"text1\ttext2"`;
		const out = [['"text1', 'text2"']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing two double quotes near a newline and text", () => {
		const str = `text1"\n"text2`;
		const out = [['text1"'], ['"text2']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing 4 double quotes", () => {
		const str = `""""`;
		const out = [['""""']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing 4 double quotes and text", () => {
		const str = `""text""`;
		const out = [['""text""']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing one double quotes", () => {
		const str = `"`;
		const out = [['"']];

		assert.deepEqual(parseTable(str), out);
	});

	it("a cell containing single quotes", () => {
		const str = `''`;
		const out = [["''"]];

		assert.deepEqual(parseTable(str), out);
	});
});

describe("Google Sheets Parser Multiple Lines with Regular Text", function () {
	it("multiple empty rows", () => {
		const str = "\n\ntext\n";
		const out = [[""], [""], ["text"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("a missing newline char at the end", () => {
		const str = "text1\ntext2\ntext3";
		const out = [["text1"], ["text2"], ["text3"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("multiple empty cells with regular text", () => {
		const str = `text1\t\t\ttext4`;
		const out = [["text1", "", "", "text4"]];

		assert.deepEqual(parseTable(str), out);
	});

	it("multiple lines of regular text", () => {
		const str = `text1\ttext2\ttext3\ntext4\ttext5\ttext6\ntext7\ttext8\ttext9`;
		const out = [
			["text1", "text2", "text3"],
			["text4", "text5", "text6"],
			["text7", "text8", "text9"],
		];

		assert.deepEqual(parseTable(str), out);
	});

	it("multiple empty cells from multiple lines of regular text", () => {
		const str = `text1\ttext2\t\ntext4\t\ttext6\n\ttext8\ttext9`;
		const out = [
			["text1", "text2", ""],
			["text4", "", "text6"],
			["", "text8", "text9"],
		];

		assert.deepEqual(parseTable(str), out);
	});

	it("lines of varying length", () => {
		const str = `text1\ttext2\n\ntext4\ttext5\ttext6`;
		const out = [["text1", "text2"], [""], ["text4", "text5", "text6"]];

		assert.deepEqual(parseTable(str), out);
	});
});

describe("Google Sheets Parser Multiple Lines with Quoted Text", function () {});

const x = `Regular Text  	"Text with
new line"	Text with "quotes" in it	"Another" text with "quotes" in "it"	"Text with ""quotes"" and
new lines"	"Text with ""new
lines"" in quotes"`;
const y = [
	[
		"Regular Text",
		"Text with new line",
		'Text with "quotes" in it',
		'"Another" text with "quotes" in "it"',
		'Text with "quotes" and new lines',
		'Text with "new lines" in quotes',
	],
];
