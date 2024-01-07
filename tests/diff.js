import chai from "chai";
const { assert } = chai;

import { combineJobs, mapJobsSheet, mapJobsSystem } from "../main.js";
import { MAPPED_DEMO_SYS, MAPPED_DEMO_SHEET, COMBINED_JOBS, DEMO_GLOBAL_DATE } from "../demo-data.js";

describe("Demo Job Combination Test", () => {
	it("should combine the jobs correctly", () => {
		assert.deepEqual(combineJobs(MAPPED_DEMO_SYS, MAPPED_DEMO_SHEET, DEMO_GLOBAL_DATE), COMBINED_JOBS);
	});
});