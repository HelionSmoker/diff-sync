export const SYSTEM_SHIFTS_HEADER = ["Confirmation", "Vendor", "Worker Name", "Start Time"];
export const SHEET_SHIFTS_HEADER = [
	"Start Date",
	"Confirmation",
	"Vendor",
	"Worker Name",
	"Upload Period",
	"Source",
	"Comment",
	"Start Time",
];
export const DATE_FMT_OPTIONS = new Intl.DateTimeFormat("en-US", {
	month: "2-digit",
	day: "2-digit",
});
export const TIME_FMT_OPTIONS = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "2-digit",
	hour12: true,
});
export const DEFAULT_YEAR = 2000;

export const SHIFTS_DATE_DEMO = "12/10";

export const DEMO_SYSTEM = `
51230	Vendor1	Roderick Corina	8:00 AM
51230	Vendor2	Trent Bevan	9:00 AM
51230	Vendor1	Marcus Dillon	5:00 PM

51231	Vendor2	Marina Brandon	8:00 AM
51231	Vendor1	Marina Brandon	8:00 AM
51231	Vendor2	Marina Brandon	6:00 PM
51231	Vend@r 2	Marina Brandon	8:00 AM
51231	   Vendor2  	Marina Brandon	8:00 AM

51232	Vendor2	Trent Bevan	8:00 AM

51233			8:00 AM
51233			8:00 AM
51233			8:00 AM
51233	Vendor1		8:00 AM

51_234	Vendor1	Louis Monroe	8:00 AM
100051234	Vendor1	Cooper Peta	8:00 AM
00051234	Vendor2	Orpha Ethan	8:00 AM
-0_10abc0@0_5,1.234	Vendor1	Hellen Natalie	8:00 AM

51235	Vendor1	 aleta_ rosanne 	8:00 AM
51235	Vendor1	         FElICIa       	8:00 AM
51235	Vendor1	 !!@# Sh##eridan456 Haywood 123	8:00 AM
51235	Vendor1		6:00 AM

51236	Vendor1	Pheobe Bertha	8:00 aM
51236	Vendor1	Franklin Narelle	"  8: 00 Am"
51236	Vendor1	Rochelle Maude	 bdfgh 8!!:00 PM()#$

51237	Vendor1	 Sheldon Mac 	8:00 AM
51237	Vendor1	 Naomi Brennan 	8:00 AM
51237	Vendor1	 Kelvin Denton 	8:00 AM
51237	Vendor1	 Dayna Kelley 	8:00 AM
51237	Vendor1	 Cooper Isla 	8:00 AM
51237	Vendor1	 Quinten Alvin 	8:00 AM
51237	Vendor1	 Fiona Gwyneth 	8:00 AM
51237	Vendor1	 Raymond Lilyrose 	8:00 AM
51237	Vendor1	 Linsey Robert 	8:00 AM
`;

export const DEMO_SHEET = `
12/10	51230	Vendor1	Roderick Corina	before	App	everything good	8:00 AM
12/10/2023	51230	Vendor2	Trent Bevan	before	App	everything good	8:00 AM
Dec 10 2023	51230	Vendor1	Marcus Dillon	during	App	no pic	8:00 AM
././.dEc.10/2023 /	51231	Vendor1	Marina Brandon	during	App	everything good	8:00 AM
"-2023/#^@%#^12/   10" 	51231	Vendor1	Marina Brandon	before	App	only location	8:00 AM

12/10	51_231	Vendor1	Marina Brandon	before	App	no pics	8:00 AM
12/10	100051231	Vendor1	Marina Brandon	before	App	everything good	8:00 AM
12/10	00051231	Vendor1	Marina Brandon	before	App	no boots	8:00 AM
12/10	-0_10abc0@0_5,1.231	Vendor2	Trent Bevan	before	App	everything good	8:00 AM

12/10	51232	Vendor1		before	App	everything good	8:00 AM
12/10	51232	Vend@r1 		before	App	everything good	8:00 AM

12/11	51233	Vendor1	aleta_ rosanne	before	App	everything good	8:00 AM
12/11	51233	Vendor1	         FElICIa       	before	App	missing pics	18:00 AM
12/11	51233	Vendor1	 !!@# Sh##eridan456 Haywood	before	App	everything good	8:00 AM
12/11	51233	Vendor1		before	App	everything good	8:00 AM

12/10	51234	Vendor1	Sheldon Mac	be  fore	App	everything good	8:00 AM
12/10	51236	Vendor1	Pheobe Bertha	  d#@!ur^*&ing	App	no flashlight	8:00 AM
12/10	51236	Vendor1	Franklin Narelle		App	everything good	8:00 AM

12/12	51236	Vendor1	Rochelle Maude	before	 app	everything good	8:00 AM
12/10	51237	Vendor1	Sheldon Mac	before	App	everything good	8:00 AM
12/12	51237	Vendor1	Naomi Brennan	before	a #@p*&*@p!!	no "slow down" sign	8:00 AM
12/12	51237	Vendor1	Kelvin Denton	before	E2662m@@ail!@  	everything good	8:00 AM
12/12	51237	Vendor1	Dayna Kelley	before		everything good	8:00 AM

12/10	51237	Vendor1	Cooper Isla	before	App	everything good	8:00 AM
12/10	51237	Vendor1	Quinten Alvin	before	App	everything good	  8:00 AM
12/10	51237	Vendor1	Fiona Gwyneth	before	App	everything good	 bdfgh 5!!:008:00 AM

12/10	51237	Vendor1	Raymond Lilyrose	before	App	everything    good	8:00 AM
12/10	51237	Vendor1	 Linsey Robert 	before	App	missing     boots and no "stop" sign! 	8:00 AM
`;
