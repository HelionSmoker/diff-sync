import chai from "chai";
const { assert } = chai;

import {
	combineJobs,
	parseConf,
	parseName,
	parseDate,
	parseTime,
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
	it("should correctly parse short format conf", () => {
		const input = "64706";
		const out = 64706;

		assert.deepEqual(parseConf(input), out);
	});

	it("should correctly parse long format conf", () => {
		const input = "100064706";
		const out = 64706;
		
		assert.deepEqual(parseConf(input), out);
	});
	
	it("should parse short and long format to the same number", () => {
		const input1 = "100064555";
		const out1 = parseConf(input1);

		const input2 = "64555";
		const out2 = parseConf(input2);
		
		assert.deepEqual(out1, out2);
	});

	it("should return the absolute value", () => {
		const input = "-64706";
		const out = 64706;
		
		assert.deepEqual(parseConf(input), out);
	});

	it("should ignore all non-digits", () => {
		const input = "-0_10abc0@0_5,1.235";
		const out = 51235;
		
		assert.deepEqual(parseConf(input), out);
	});

	it("should ignore leading zeros", () => {
		const input = "0000000064706";
		const out = 64706;
		
		assert.deepEqual(parseConf(input), out);
	});

	it("should return undefined when we pass in an empty string", () => {
		const input = "";
		const out = undefined;

		assert.deepEqual(parseConf(input), out);
	});

	it("should return undefined when we pass a really big number", () => {
		const input = "1234567891";
		const out = undefined;

		assert.deepEqual(parseConf(input), out);
	});
});

describe("Worker Name Parser", function () {
	it("should correctly parse an American name", () => {
		const input = "John Smith";
		const out = "John Smith";
		
		assert.deepEqual(parseName(input), out);
	});

	it("should correctly parse a full American name", () => {
		const input = "John Andrew Smith";
		const out = "John Andrew Smith";

		assert.deepEqual(parseName(input), out);
	});

	it("should correctly parse a name with diacritics", () => {
		const input = "Javier Valdés";
		const out = "Javier Valdés";
		
		assert.deepEqual(parseName(input), out);
	});

	it("should correctly parse a name with periods", () => {
		const input = "J.R.R. Tolkien";
		const out = "J.R.R. Tolkien";
		
		assert.deepEqual(parseName(input), out);
	});

	it("should correctly parse a name with dashes", () => {
		const input = "Erich-Maria—Remarque";
		const out = "Erich-Maria—Remarque";
		
		assert.deepEqual(parseName(input), out);
	});

	it("should correctly parse a name with apostrophes", () => {
		const input = "O'Brian Daniel";
		const out = "O'Brian Daniel";
		
		assert.deepEqual(parseName(input), out);
	});

	it("should discard of repeating special chars", () => {
		const input = "O'''Brian  Daniel";
		const out = "O'Brian Daniel";
		
		assert.deepEqual(parseName(input), out);
	});

	it("should keep the spaces, even if it doesn't make sense", () => {
		const input = "John Sm ith";
		const out = "John Sm Ith";
		
		assert.deepEqual(parseName(input), out);
	});

	it("ignore non-alpha and non-special chars", () => {
		const input = "()=Anne-😅1%%&23Marie";
		const out = "Anne-Marie";

		assert.deepEqual(parseName(input), out);
	});
	
	it("should trim the text and remove duplicate spaces", () => {
		const input = "  John    Smith  ";
		const out = "John Smith";
		
		assert.deepEqual(parseName(input), out);
	});

	it("should return an empty string when parsing an empty string", () => {
		const input = "";
		const out = "";
	
		assert.deepEqual(parseName(input), out);
	});
});

const CURRENT_YEAR = new Date().getFullYear();

describe("Date parser", function () {
	it("should correctly parse a full date", () => {
		const input = "Nov 11 2023";
		const out = new Date("Nov 11 2023");
		
		assert.deepEqual(parseDate(input), out);
	});
	
	it("should correctly parse a short date", () => {
		const input = "Nov 11";
		const out = new Date(`Nov 11 ${CURRENT_YEAR}`);
		
		assert.deepEqual(parseDate(input), out);
	});

	it("should correctly parse a full numerical date", () => {
		const input = "12/11/2023";
		const out = new Date("Dec 11 2023");

		assert.deepEqual(parseDate(input), out);
	});
	
	it("should correctly parse a short numerical date", () => {
		const input = "12/11";
		const out = new Date(`Dec 11 ${CURRENT_YEAR}`);
		
		assert.deepEqual(parseDate(input), out);
	});
	
	it("should ignore special chars", () => {
		const input = "$##$#$ 12/ $&11/ 20#😄@$23";
		const out = new Date("Dec 11 2023");

		assert.deepEqual(parseDate(input), out);
	});
	
	it("should ignore consecutive separators", () => {
		const input = "  12// - ..11/ 2023-/  ";
		const out = new Date("Dec 11 2023");
		
		assert.deepEqual(parseDate(input), out);
	});

	it("should return undefined if dateStr is empty", () => {
		const input = "";
		const out = undefined;
	
		assert.deepEqual(parseDate(input), out);
	});
});

describe("Start Time Parser", () => {
	it("should parse start time correctly", () => {
		const input = "9:00 AM";
		const out = "9:00am";

		assert.deepEqual(parseTime(input), out);
	});

	it("should parse time with no space correctly", () => {
		const input = "9:00AM";
		const out = "9:00am";

		assert.deepEqual(parseTime(input), out);
	});

	it("should ignore case", () => {
		const input = "9:00pM";
		const out = "9:00pm";

		assert.deepEqual(parseTime(input), out);
	});
	
	it("should ignore all non-digits chars except ':'", () => {
		const input = "bcdef!@#$9^*:0&😄&0-";
		const out = "9:00am";

		assert.deepEqual(parseTime(input), out);
	});

	it("should favor 'am' if both are present", () => {
		const input = "9:00apM";
		const out = "9:00am";

		assert.deepEqual(parseTime(input), out);
	});

	it("should favor 'am' if neither are present", () => {
		const input = "9:00";
		const out = "9:00am";

		assert.deepEqual(parseTime(input), out);
	});

	it("should parse correctly leading meridians", () => {
		const input = "am 9:00";
		const out = "9:00am";

		assert.deepEqual(parseTime(input), out);
	});

	it("should return undefined when parsing an empty string", () => {
		const input = "";
		const out = undefined;

		assert.deepEqual(parseTime(input), out);
	});
});

describe("Upload Period Parser", () => {
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
		const input = "#%%   d!@  @$@😄uri &@ ng";
		const out = "during";

		assert.deepEqual(parseUploadPeriod(input), out);
	});

	it("an empty string", () => {
		const input = "";
		const out = "";
	
		assert.deepEqual(parseUploadPeriod(input), out);
	});
});

describe("Image Source Parser", () => {
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
		const input = "#%%   e!@  @$@😄mai &@ l ";
		const out = "Email";

		assert.deepEqual(parseSource(input), out);
	});
	
	it("should return 'App' if source is unknown", () => {
		const input = "mobile";
		const out = "App";
		
		assert.deepEqual(parseSource(input), out);
	});

	it("should return 'App' if source is empty", () => {
		const input = "";
		const out = "App";
	
		assert.deepEqual(parseSource(input), out);
	});
});
