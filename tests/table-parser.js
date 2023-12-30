import chai from "chai";
const { assert } = chai;

import { parseTable } from "../main.js";

describe("Google Sheets Parser Single Line with Regular Text", function () {
	it("an empty string", () => {
		const input = "";
		const out = [[""]];

		assert.deepEqual(parseTable(input), out);
	});

	it("a single cell", () => {
		const input = "text\n";
		const out = [["text"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple cells", () => {
		const input = `text1\ttext2\ttext3\n`;
		const out = [["text1", "text2", "text3"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple cells without newline char", () => {
		const input = `text1\ttext2\ttext3`;
		const out = [["text1", "text2", "text3"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("an empty cell", () => {
		const input = `text1\t\ttext2\n`;
		const out = [["text1", "", "text2"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("an empty final cell", () => {
		const input = `text1\ttext2\t\n`;
		const out = [["text1", "text2", ""]];

		assert.deepEqual(parseTable(input), out);
	});

	it("an empty final cell without newline char", () => {
		const input = `text1\ttext2\t`;
		const out = [["text1", "text2", ""]];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple empty cells", () => {
		const input = `\t\ttext\n`;
		const out = [["", "", "text"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple empty cells  without newline char", () => {
		const input = `\t\ttext`;
		const out = [["", "", "text"]];

		assert.deepEqual(parseTable(input), out);
	});
});

describe("Google Sheets Parser Single Line with Quoted Text", function () {
	it("a cell containing two double quotes and text", () => {
		const input = `"text"`;
		const out = [['"text"']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing two double quotes, a newline and text", () => {
		const input = `"text1\ntext2`;
		const out = [['"text1'], ["text2"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing escaped double quotes and text", () => {
		const input = `""text""`;
		const out = [['""text""']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing escaped double quotes, a newline and text", () => {
		const input = `"""text1\ntext2"""`;
		const out = [['"""text1'], ['text2"""']];

		assert.deepEqual(parseTable(input), out);
	});

	it("(str) and text", () => {
		const input = `"""text1""\n""text2"""`;
		const out = [['"""text1""'], ['""text2"""']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing two double quotes", () => {
		const input = `""`;
		const out = [['""']];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple cells containing two double quotes", () => {
		const input = `""\t""\t""`;
		const out = [['""', '""', '""']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing double quotes wrapped on newline", () => {
		// Since Google Sheets does not allow the presence of a newline char at the
		// beginning of the cell, the following string is not the result of a copy,
		// but rather the original values of the cells.

		const input = `"\n"`;
		const out = [['"'], ['"']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing double quotes wrapped on newline and text", () => {
		const input = `text1"\n"text2`;
		const out = [['text1"'], ['"text2']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing double quotes wrapped on newline and end text", () => {
		const input = `"\n"text`;
		const out = [['"'], ['"text']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing two double quotes, a newline, and end text", () => {
		// See explanation above
		const input = `"\ntext"`;
		const out = [['"'], ['text"']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing two double quotes, a newline, and start text", () => {
		// Trailing newlines are allowed by Google Sheets, but we trim them.
		const input = `"text\n"`;
		const out = [["text"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing two double quotes, multiple newlines, and start text", () => {
		// See explanation above
		const input = `"text\n\n\n"`;
		const out = [["text"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing two double quotes, multiple newlines, and end text", () => {
		// See explanation above
		const input = `"\n\n\ntext"`;
		const out = [['"'], [""], [""], ['text"']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing two double quotes, a tab and text", () => {
		const input = `"text1\ttext2"`;
		const out = [['"text1', 'text2"']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing 4 double quotes", () => {
		const input = `""""`;
		const out = [['""""']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing one double quotes", () => {
		const input = `"`;
		const out = [['"']];

		assert.deepEqual(parseTable(input), out);
	});

	it("a cell containing single quotes", () => {
		const input = `''`;
		const out = [["''"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("complex line with proper quotes", () => {
		const input = `Regular Text  \t"Text with\nnew line"\tText with "quotes" in it\t"Another" text with "quotes" in "it"\t"Text with ""quotes"" and
new lines"\t"Text with ""new\nlines"" in quotes"`;
		const out = [
			[
				"Regular Text",
				"Text with new line",
				'Text with "quotes" in it',
				'"Another" text with "quotes" in "it"',
				'Text with "quotes" and new lines',
				'Text with "new lines" in quotes',
			],
		];

		assert.deepEqual(parseTable(input), out);
	});

	it("complex line with improper quotes", () => {
		const input = `Regular Text  \t"Text with\nnew line"\tText with "quotes in it\t"Another text with quotes" in it"\t"Text with quotes"" and
new lines"\t"Text with ""new\nlines in quotes"`;
		const out = [
			[
				"Regular Text",
				"Text with new line",
				'Text with "quotes in it',
				'"Another text with quotes" in it"',
				'Text with quotes" and new lines',
				'Text with "new lines in quotes',
			],
		];

		assert.deepEqual(parseTable(input), out);
	});
});

describe("Google Sheets Parser Multiple Lines with Regular Text", function () {
	it("multiple empty rows", () => {
		const input = "\n\ntext\n";
		const out = [[""], [""], ["text"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("a missing newline char at the end", () => {
		const input = "text1\ntext2\ntext3";
		const out = [["text1"], ["text2"], ["text3"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple empty cells with regular text", () => {
		const input = `text1\t\t\ttext4`;
		const out = [["text1", "", "", "text4"]];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple lines of regular text", () => {
		const input = `text1\ttext2\ttext3\ntext4\ttext5\ttext6\ntext7\ttext8\ttext9`;
		const out = [
			["text1", "text2", "text3"],
			["text4", "text5", "text6"],
			["text7", "text8", "text9"],
		];

		assert.deepEqual(parseTable(input), out);
	});

	it("multiple empty cells from multiple lines of regular text", () => {
		const input = `text1\ttext2\t\ntext4\t\ttext6\n\ttext8\ttext9`;
		const out = [
			["text1", "text2", ""],
			["text4", "", "text6"],
			["", "text8", "text9"],
		];

		assert.deepEqual(parseTable(input), out);
	});

	it("lines of varying length", () => {
		const input = `text1\ttext2\n\ntext4\ttext5\ttext6`;
		const out = [["text1", "text2"], [""], ["text4", "text5", "text6"]];

		assert.deepEqual(parseTable(input), out);
	});
});

describe("Google Sheets Parser Multiple Lines with Quoted Text", function () {});
