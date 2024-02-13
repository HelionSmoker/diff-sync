import chai from "chai";
const { assert } = chai;

import {
	sortByTime,
	formatDateTime,
	findMostFrequent,
	capitalizeString,
	calcMaskLength,
	countRows,
} from "../src/utils.js";


describe("Capitalize String", () => {
	it("should capitalize the first char", () => {
		const input = "awesome";
		const out = "Awesome";

		assert.deepEqual(capitalizeString(input), out);
	});

	it("should keep capitalization of first char", () => {
		const input = "Awesome";
		const out = "Awesome";

		assert.deepEqual(capitalizeString(input), out);
	});

	it("should ignore the case of the rest of the string", () => {
		const input = "aWEsOmE";
		const out = "AWEsOmE";

		assert.deepEqual(capitalizeString(input), out);
	});

	it("should return empty str if it received empty str", () => {
		const input = "";
		const out = "";

		assert.deepEqual(capitalizeString(input), out);
	});
});
