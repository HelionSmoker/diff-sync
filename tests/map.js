import chai from "chai";
const { assert } = chai;

import { mapJobsSystem, mapJobsSheet } from "../src/shifts.js";
import {
	PARSED_DEMO_SYSTEM,
	PARSED_DEMO_SHEET,
	MAPPED_DEMO_SYSTEM,
	MAPPED_DEMO_SHEET,
	DEMO_GLOBAL_DATE,
} from "../src/data.js";

describe("Demo Mapping Test", () => {
	it("should map the parsed system jobs correctly", () => {
		assert.deepEqual(mapJobsSystem(PARSED_DEMO_SYSTEM), MAPPED_DEMO_SYSTEM);
	});
	it("should map the parsed sheet jobs correctly", () => {
		assert.deepEqual(mapJobsSheet(PARSED_DEMO_SHEET), [MAPPED_DEMO_SHEET, DEMO_GLOBAL_DATE]);
	});
});
