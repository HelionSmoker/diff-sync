import chai from "chai";
const { assert } = chai;

import {
	sortByTime,
	formatDate,
	findMostFrequent,
	toPascalCase,
	capitalizeString,
	calcMaskLength,
	countRows,
} from "../src/utils.js";


describe("Apply Pascal Case", () => {
	it("should capitalize the first character of each word", () => {
		const input = "this is a lowercase string";
		const out = "This Is A Lowercase String";

		assert.deepEqual(toPascalCase(input), out);
	});
	
	it("should change the all other characters in the word to lowercase", () => {
		const input = "THIS IS AN UPPERCASE STRING";
		const out = "This Is An Uppercase String";
		
		assert.deepEqual(toPascalCase(input), out);
	});

	it("should handle mixed cases", () => {
		const input = "ThIs iS a MiXeD cAsE sTrInG";
		const out = "This Is A Mixed Case String";

		assert.deepEqual(toPascalCase(input), out);
	});

	it("should apply pascal case to words separated by a dash", () => {
		const input = "anne-marie";
		const out = "Anne-Marie";

		assert.deepEqual(toPascalCase(input), out);
	});

	it("should apply pascal case to each group of alpha chars", () => {
		const input = "this_is@a~1weird. . . StRIng";
		const out = "This_Is@A~1Weird. . . String";

		assert.deepEqual(toPascalCase(input), out);
	});

	it("should return an empty string if an empty string is passed in", () => {
		const input = "";
		const out = "";

		assert.deepEqual(toPascalCase(input), out);
	});
});

describe("Capitalize String", () => {
	it("should capitalize the first char and change everything else to lowercase", () => {
		const input = "awesome";
		const out = "Awesome";

		assert.deepEqual(capitalizeString(input), out);
	});

	it("should keep capitalization of first char", () => {
		const input = "Awesome";
		const out = "Awesome";

		assert.deepEqual(capitalizeString(input), out);
	});

	it("should handle mixed case", () => {
		const input = "AwEsOmE";
		const out = "Awesome";

		assert.deepEqual(capitalizeString(input), out);
	});

	it("should return empty str if it received empty str", () => {
		const input = "";
		const out = "";

		assert.deepEqual(capitalizeString(input), out);
	});
});
