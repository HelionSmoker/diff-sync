import chai from "chai";
const { assert } = chai;

import { mapJobsSystem, mapJobsSheet } from "../src/jobs.js";
import {
	PARSED_DEMO_SYS,
	PARSED_DEMO_SHEET,
	MAPPED_DEMO_SYS,
	MAPPED_DEMO_SHEET,
	DEMO_GLOBAL_DATE,
} from "../src/demo-data.js";

describe("Demo Mapping Test", () => {
	it("should map the parsed system jobs correctly", () => {
		assert.deepEqual(mapJobsSystem(PARSED_DEMO_SYS), MAPPED_DEMO_SYS);
	});
	it("should map the parsed sheet jobs correctly", () => {
		assert.deepEqual(mapJobsSheet(PARSED_DEMO_SHEET), [MAPPED_DEMO_SHEET, DEMO_GLOBAL_DATE]);
	});
});
