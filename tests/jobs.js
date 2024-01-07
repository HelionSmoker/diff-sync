import chai from "chai";
const { assert } = chai;

import {
	combineJobs,
	parseConf,
	parseName,
	parseDate,
	parseUploadPeriod,
	parseSource,
} from "../src/jobs.js";
import {
	MAPPED_DEMO_SYS,
	MAPPED_DEMO_SHEET,
	COMBINED_JOBS,
	DEMO_GLOBAL_DATE,
} from "../src/demo-data.js";

describe("Demo Job Combination Test", () => {
	it("should combine the jobs correctly", () => {
		assert.deepEqual(
			combineJobs(MAPPED_DEMO_SYS, MAPPED_DEMO_SHEET, DEMO_GLOBAL_DATE),
			COMBINED_JOBS,
		);
	});
});

describe("Job Confirmation Parser", function () {
	it("an empty string", () => {
		const input = "";
		const out = 0;

		assert.deepEqual(parseConf(input), out);
	});

	it("long format", () => {
		const input = "100064706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("short format", () => {
		const input = "64706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("ignore non-digits", () => {
		const input = "1000 . &@*& abc -64706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("ignore minus sign", () => {
		const input = "-64706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("ignore leading zeros", () => {
		const input = "00064706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});
});

describe("Worker Name Parser", function () {
	it("an empty string", () => {
		const input = "";
		const out = "";

		assert.deepEqual(parseName(input), out);
	});

	it("regular first and last name", () => {
		const input = "John Smith";
		const out = "John Smith";

		assert.deepEqual(parseName(input), out);
	});

	it("regular first, last, and middle name", () => {
		const input = "John Andrew Smith";
		const out = "John Andrew Smith";

		assert.deepEqual(parseName(input), out);
	});

	it("don't fix broken names", () => {
		const input = "John Sm ith";
		const out = "John Sm Ith";

		assert.deepEqual(parseName(input), out);
	});

	it("ignore non-alpha and non-space", () => {
		const input = "()-=John 123Smi1th";
		const out = "John Smith";

		assert.deepEqual(parseName(input), out);
	});

	it("should trim the text and remove duplicate spaces", () => {
		const input = "  John    Smith  ";
		const out = "John Smith";

		assert.deepEqual(parseName(input), out);
	});
});

function getCurrentYear() {
	return new Date().getFullYear();
}

describe("Date parser", function () {
	it("should return 0 if dateStr is empty", () => {
		const input = "";
		const out = undefined;

		assert.deepEqual(parseDate(input), out);
	});

	it("should correctly parse a full date", () => {
		const input = "Nov 11 2023";
		const out = new Date("Nov 11 2023");

		assert.deepEqual(parseDate(input), out);
	});

	it("should correctly parse a short date", () => {
		const input = "Nov 11";
		const out = new Date(`Nov 11 ${getCurrentYear()}`);

		assert.deepEqual(parseDate(input), out);
	});

	it("should correctly parse a full numerical date", () => {
		const input = "12/11/2023";
		const out = new Date("Dec 11 2023");

		assert.deepEqual(parseDate(input), out);
	});

	it("should correctly parse a short numerical date", () => {
		const input = "12/11";
		const out = new Date(`Dec 11 ${getCurrentYear()}`);

		assert.deepEqual(parseDate(input), out);
	});

	it("should ignore special chars", () => {
		const input = "$##$#$ 12/ $&11/ 20#@$23";
		const out = new Date("Dec 11 2023");

		assert.deepEqual(parseDate(input), out);
	});

	it("should ignore consecutive separators", () => {
		const input = "  12// - ..11/ 2023-/  ";
		const out = new Date("Dec 11 2023");

		assert.deepEqual(parseDate(input), out);
	});
});

describe("Upload Period Parser", () => {
	it("an empty string", () => {
		const input = "";
		const out = "";

		assert.deepEqual(parseUploadPeriod(input), out);
	});

	it("should parse 'during' correctly", () => {
		const input = "during";
		const out = "during";

		assert.deepEqual(parseUploadPeriod(input), out);
	});

	it("should parse 'before' correctly", () => {
		const input = "before";
		const out = "before";

		assert.deepEqual(parseUploadPeriod(input), out);
	});

	it("should ignore any unknown period", () => {
		const input = "after";
		const out = "";

		assert.deepEqual(parseUploadPeriod(input), out);
	});

	it("should ignore case", () => {
		const input = "DurING";
		const out = "during";

		assert.deepEqual(parseUploadPeriod(input), out);
	});

	it("should discard anything non-alpha", () => {
		const input = "#%%   d!@  @$@uri &@ ng";
		const out = "during";

		assert.deepEqual(parseUploadPeriod(input), out);
	});
});

describe("Image Source Parser", () => {
	it("an empty string", () => {
		const input = "";
		const out = "App";

		assert.deepEqual(parseSource(input), out);
	});

	it("should parse 'App'", () => {
		const input = "App";
		const out = "App";

		assert.deepEqual(parseSource(input), out);
	});

	it("should parse 'Email'", () => {
		const input = "Email";
		const out = "Email";

		assert.deepEqual(parseSource(input), out);
	});

	it("should ignore case", () => {
		const input = "EmaIl";
		const out = "Email";

		assert.deepEqual(parseSource(input), out);
	});

	it("should discard anything non-alpha", () => {
		const input = "#%%   e!@  @$@mai &@ l ";
		const out = "Email";

		assert.deepEqual(parseSource(input), out);
	});

	it("should return 'App' if source is unknown", () => {
		const input = "mobile";
		const out = "App";

		assert.deepEqual(parseSource(input), out);
	});
});
