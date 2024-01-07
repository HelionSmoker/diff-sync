export const DEMO_SYS = `
51230	Vendor1	Roderick Corina	1:00 AM

51231	Vendor3	Trent Bevan	8:00 AM

51232	Vendor1	Marcus Dillon	5:00 PM
51232	Vendor2	Marina Brandon	9:20 AM

51231	Vendor2	Marina Brandon	6:00 PM
51231	Vendor3	Trent Bevan	9:00 PM

51233	Vendor1	Agatha Colin	8:00 AM
51233	Vendor1	Agatha Colin	3:00 PM
51233	Vendor2	Agatha Colin	3:00 PM
51233	Vendor 2	Agatha Colin	3:00 PM

51234			8:00 AM
51234			8:00 AM
51234			8:00 AM

51234	Vendor Name	 Zane Wilford 	6:00 AM
51234	Vendor  N#@ame 	 Earl Harper 	6:00 AM

51_235	Vendor1	Louis Monroe	2:00 PM
100051235	Vendor1	Cooper Peta	2:00 PM
00051235	Vendor2	Orpha Ethan	1:00 PM
-0_10abc0@0_5,1.235	Vendor2	Hellen Natalie	1:00 PM

51236	Vendor1	 aleta_ rosanne 	8:00 AM
51236	Vendor1	         FElICIa       	2:00 AM
51236	Vendor1	 !!@# Sh##eridan456 Haywood 123	9:00 AM
51236	Vendor1		6:00 AM

51237	Vendor1	Pheobe Bertha	8 :00 aM
51237	Vendor1	Franklin Narelle	  6 :00 Am   
51237	Vendor1	Rochelle Maude	 bdfgh 5 !!:00 PM()#$  

51238	Vendor1	 Sheldon Mac 	6:00 AM
51238	Vendor1	 Naomi Brennan 	6:00 AM
51238	Vendor1	 Kelvin Denton 	6:00 AM
51239	Vendor1	 Dayna Kelley 	6:00 AM
51239	Vendor1	 Cooper Isla 	6:00 AM
51239	Vendor1	 Quinten Alvin 	6:00 AM
51239	Vendor1	 Fiona Gwyneth 	6:00 AM
51239	Vendor1	 Raymond Lilyrose 	6:00 AM
`;

export const DEMO_SHEET = `
12/10	51230	Vendor1	Roderick Corina	before	App	everything good	1:00 AM

12/10/2023	51231	Vendor1	Trent Bevan	before	App	everything good	2:00 AM
Dec 10 2023	51232	Vendor1	Marcus Dillon	during	App	no pic	2:20 AM
././.dEc.10/2023 /	51231	Vendor1	Marina Brandon	during	App	everything good	2:20 AM
"-2023/#^@%#^12/   10" 	51233	Vendor1	Agatha Colin	before	App	everything good	2:20 AM

12/10	51234	Vendor Name	Zane Wilford	during	App	missing boots	1:00 AM
12/10	51234	Vendor  N#@ame 	Earl Harper	before	App	everything good	1:00 AM

12/10	51_235	Vendor1	Louis Monroe	before	App	only vest  	1:00 AM
12/10	100051235	Vendor1	Cooper Peta	before	App	everything good	1:00 AM
12/10	00051235	Vendor1	Orpha Ethan	before	App	only location	1:00 AM
12/10	-0_10abc0@0_5,1.235	Vendor2	Hellen Natalie	before	App	everything good	1:00 AM

12/11	51236	Vendor1	aleta_ rosanne	before	App	everything good	12:00 AM
12/11	51236	Vendor1	         FElICIa       	before	App	everything good	12:00 PM
12/11	51236	Vendor1	 !!@# Sh##eridan456 Haywood	before	App	everything good	1:00 AM
12/11	51236	Vendor1		before	App	everything good	11:00 AM

12/10	51238	Vendor1	Sheldon Mac	be  fore	App	everything good	11:00 AM
12/10	51238	Vendor1	Naomi Brennan	  d#@!ur^*&ing	App	everything good	11:00 AM
12/10	51238	Vendor1	Kelvin Denton		App	everything good	11:00 AM

12/12	51239	Vendor1	Dayna Kelley	before	 app	everything good	12:00 AM
12/12	51239	Vendor1	Cooper Isla	before	a #@p*&*@p!!	everything good	12:00 AM
12/12	51239	Vendor1	Quinten Alvin	before	E2662m@@ail!@  	everything good	12:00 AM
12/12	51239	Vendor1	Fiona Gwyneth	before		everything good	2:00 AM

12/10	51239	Vendor1	Raymond Lilyrose	before	App	missing     boots and no "stop" sign!	3:00 PM

12/10	51237	Vendor1	Pheobe Bertha	before	App	everything good	8 :00 aM
12/10	51237	Vendor1	Franklin Narelle	before	App	everything good	  6 :00 Am   
12/10	51237	Vendor1	Rochelle Maude	before	App	everything good	 bdfgh 5 !!:00 PM()#$  

12/10	51229	Vendor1	Roderick Corina	before	App	everything good	5:00 AM
12/10	51229	Vendor1	 Linsey Robert 	before	App	everything good	7:00 AM
`;

export const PARSED_DEMO_SYS = [
	[""],
	["51230", "Vendor1", "Roderick Corina", "1:00 AM"],
	[""],
	["51231", "Vendor3", "Trent Bevan", "8:00 AM"],
	[""],
	["51232", "Vendor1", "Marcus Dillon", "5:00 PM"],
	["51232", "Vendor2", "Marina Brandon", "9:20 AM"],
	[""],
	["51231", "Vendor2", "Marina Brandon", "6:00 PM"],
	["51231", "Vendor3", "Trent Bevan", "9:00 PM"],
	[""],
	["51233", "Vendor1", "Agatha Colin", "8:00 AM"],
	["51233", "Vendor1", "Agatha Colin", "3:00 PM"],
	["51233", "Vendor2", "Agatha Colin", "3:00 PM"],
	["51233", "Vendor 2", "Agatha Colin", "3:00 PM"],
	[""],
	["51234", "", "", "8:00 AM"],
	["51234", "", "", "8:00 AM"],
	["51234", "", "", "8:00 AM"],
	[""],
	["51234", "Vendor Name", "Zane Wilford", "6:00 AM"],
	["51234", "Vendor  N#@ame", "Earl Harper", "6:00 AM"],
	[""],
	["51_235", "Vendor1", "Louis Monroe", "2:00 PM"],
	["100051235", "Vendor1", "Cooper Peta", "2:00 PM"],
	["00051235", "Vendor2", "Orpha Ethan", "1:00 PM"],
	["-0_10abc0@0_5,1.235", "Vendor2", "Hellen Natalie", "1:00 PM"],
	[""],
	["51236", "Vendor1", "aleta_ rosanne", "8:00 AM"],
	["51236", "Vendor1", "FElICIa", "2:00 AM"],
	["51236", "Vendor1", "!!@# Sh##eridan456 Haywood 123", "9:00 AM"],
	["51236", "Vendor1", "", "6:00 AM"],
	[""],
	["51237", "Vendor1", "Pheobe Bertha", "8 :00 aM"],
	["51237", "Vendor1", "Franklin Narelle", "6 :00 Am"],
	["51237", "Vendor1", "Rochelle Maude", "bdfgh 5 !!:00 PM()#$"],
	[""],
	["51238", "Vendor1", "Sheldon Mac", "6:00 AM"],
	["51238", "Vendor1", "Naomi Brennan", "6:00 AM"],
	["51238", "Vendor1", "Kelvin Denton", "6:00 AM"],
	["51239", "Vendor1", "Dayna Kelley", "6:00 AM"],
	["51239", "Vendor1", "Cooper Isla", "6:00 AM"],
	["51239", "Vendor1", "Quinten Alvin", "6:00 AM"],
	["51239", "Vendor1", "Fiona Gwyneth", "6:00 AM"],
	["51239", "Vendor1", "Raymond Lilyrose", "6:00 AM"],
];

export const PARSED_DEMO_SHEET = [
	[""],
	["12/10", "51230", "Vendor1", "Roderick Corina", "before", "App", "everything good", "1:00 AM"],
	[""],
	[
		"12/10/2023",
		"51231",
		"Vendor1",
		"Trent Bevan",
		"before",
		"App",
		"everything good",
		"2:00 AM",
	],
	["Dec 10 2023", "51232", "Vendor1", "Marcus Dillon", "during", "App", "no pic", "2:20 AM"],
	[
		"././.dEc.10/2023 /",
		"51231",
		"Vendor1",
		"Marina Brandon",
		"during",
		"App",
		"everything good",
		"2:20 AM",
	],
	[
		'"-2023/#^@%#^12/   10"',
		"51233",
		"Vendor1",
		"Agatha Colin",
		"before",
		"App",
		"everything good",
		"2:20 AM",
	],
	[""],
	["12/10", "51234", "Vendor Name", "Zane Wilford", "during", "App", "missing boots", "1:00 AM"],
	[
		"12/10",
		"51234",
		"Vendor  N#@ame",
		"Earl Harper",
		"before",
		"App",
		"everything good",
		"1:00 AM",
	],
	[""],
	["12/10", "51_235", "Vendor1", "Louis Monroe", "before", "App", "only vest", "1:00 AM"],
	["12/10", "100051235", "Vendor1", "Cooper Peta", "before", "App", "everything good", "1:00 AM"],
	["12/10", "00051235", "Vendor1", "Orpha Ethan", "before", "App", "only location", "1:00 AM"],
	[
		"12/10",
		"-0_10abc0@0_5,1.235",
		"Vendor2",
		"Hellen Natalie",
		"before",
		"App",
		"everything good",
		"1:00 AM",
	],
	[""],
	["12/11", "51236", "Vendor1", "aleta_ rosanne", "before", "App", "everything good", "12:00 AM"],
	["12/11", "51236", "Vendor1", "FElICIa", "before", "App", "everything good", "12:00 PM"],
	[
		"12/11",
		"51236",
		"Vendor1",
		"!!@# Sh##eridan456 Haywood",
		"before",
		"App",
		"everything good",
		"1:00 AM",
	],
	["12/11", "51236", "Vendor1", "", "before", "App", "everything good", "11:00 AM"],
	[""],
	["12/10", "51238", "Vendor1", "Sheldon Mac", "be  fore", "App", "everything good", "11:00 AM"],
	[
		"12/10",
		"51238",
		"Vendor1",
		"Naomi Brennan",
		"d#@!ur^*&ing",
		"App",
		"everything good",
		"11:00 AM",
	],
	["12/10", "51238", "Vendor1", "Kelvin Denton", "", "App", "everything good", "11:00 AM"],
	[""],
	["12/12", "51239", "Vendor1", "Dayna Kelley", "before", "app", "everything good", "12:00 AM"],
	[
		"12/12",
		"51239",
		"Vendor1",
		"Cooper Isla",
		"before",
		"a #@p*&*@p!!",
		"everything good",
		"12:00 AM",
	],
	[
		"12/12",
		"51239",
		"Vendor1",
		"Quinten Alvin",
		"before",
		"E2662m@@ail!@",
		"everything good",
		"12:00 AM",
	],
	["12/12", "51239", "Vendor1", "Fiona Gwyneth", "before", "", "everything good", "2:00 AM"],
	[""],
	[
		"12/10",
		"51239",
		"Vendor1",
		"Raymond Lilyrose",
		"before",
		"App",
		'missing     boots and no "stop" sign!',
		"3:00 PM",
	],
	[""],
	["12/10", "51237", "Vendor1", "Pheobe Bertha", "before", "App", "everything good", "8 :00 aM"],
	[
		"12/10",
		"51237",
		"Vendor1",
		"Franklin Narelle",
		"before",
		"App",
		"everything good",
		"6 :00 Am",
	],
	[
		"12/10",
		"51237",
		"Vendor1",
		"Rochelle Maude",
		"before",
		"App",
		"everything good",
		"bdfgh 5 !!:00 PM()#$",
	],
	[""],
	["12/10", "51229", "Vendor1", "Roderick Corina", "before", "App", "everything good", "5:00 AM"],
	["12/10", "51229", "Vendor1", "Linsey Robert", "before", "App", "everything good", "7:00 AM"],
];

export const MAPPED_DEMO_SYS = {
	51230: { "Roderick Corina": ["Vendor1", "1:00am"] },
	51231: { "Trent Bevan": ["Vendor3", "9:00pm"], "Marina Brandon": ["Vendor2", "6:00pm"] },
	51232: { "Marcus Dillon": ["Vendor1", "5:00pm"], "Marina Brandon": ["Vendor2", "9:20am"] },
	51233: { "Agatha Colin": ["Vendor 2", "3:00pm"] },
	51234: {
		"": ["", "8:00am"],
		" ": ["", "8:00am"],
		"  ": ["", "8:00am"],
		"Zane Wilford": ["Vendor Name", "6:00am"],
		"Earl Harper": ["Vendor Name", "6:00am"],
	},
	51235: {
		"Louis Monroe": ["Vendor1", "2:00pm"],
		"Cooper Peta": ["Vendor1", "2:00pm"],
		"Orpha Ethan": ["Vendor2", "1:00pm"],
		"Hellen Natalie": ["Vendor2", "1:00pm"],
	},
	51236: {
		"Aleta Rosanne": ["Vendor1", "8:00am"],
		"Felicia": ["Vendor1", "2:00am"],
		"Sheridan Haywood": ["Vendor1", "9:00am"],
		"": ["Vendor1", "6:00am"],
	},
	51237: {
		"Pheobe Bertha": ["Vendor1", "8:00am"],
		"Franklin Narelle": ["Vendor1", "6:00am"],
		"Rochelle Maude": ["Vendor1", "5:00pm"],
	},
	51238: {
		"Sheldon Mac": ["Vendor1", "6:00am"],
		"Naomi Brennan": ["Vendor1", "6:00am"],
		"Kelvin Denton": ["Vendor1", "6:00am"],
	},
	51239: {
		"Dayna Kelley": ["Vendor1", "6:00am"],
		"Cooper Isla": ["Vendor1", "6:00am"],
		"Quinten Alvin": ["Vendor1", "6:00am"],
		"Fiona Gwyneth": ["Vendor1", "6:00am"],
		"Raymond Lilyrose": ["Vendor1", "6:00am"],
	},
};

export const MAPPED_DEMO_SHEET = {
	51229: {
		"Roderick Corina": ["before", "App", "everything good"],
		"Linsey Robert": ["before", "App", "everything good"],
	},
	51230: { "Roderick Corina": ["before", "App", "everything good"] },
	51231: {
		"Trent Bevan": ["before", "App", "everything good"],
		"Marina Brandon": ["during", "App", "everything good"],
	},
	51232: { "Marcus Dillon": ["during", "App", "no pic"] },
	51233: { "Agatha Colin": ["before", "App", "everything good"] },
	51234: {
		"Zane Wilford": ["during", "App", "missing boots"],
		"Earl Harper": ["before", "App", "everything good"],
	},
	51235: {
		"Louis Monroe": ["before", "App", "only vest"],
		"Cooper Peta": ["before", "App", "everything good"],
		"Orpha Ethan": ["before", "App", "only location"],
		"Hellen Natalie": ["before", "App", "everything good"],
	},
	51236: {
		"Aleta Rosanne": ["before", "App", "everything good"],
		"Felicia": ["before", "App", "everything good"],
		"Sheridan Haywood": ["before", "App", "everything good"],
		"": ["before", "App", "everything good"],
	},
	51237: {
		"Pheobe Bertha": ["before", "App", "everything good"],
		"Franklin Narelle": ["before", "App", "everything good"],
		"Rochelle Maude": ["before", "App", "everything good"],
	},
	51238: {
		"Sheldon Mac": ["before", "App", "everything good"],
		"Naomi Brennan": ["during", "App", "everything good"],
		"Kelvin Denton": ["", "App", "everything good"],
	},
	51239: {
		"Dayna Kelley": ["before", "App", "everything good"],
		"Cooper Isla": ["before", "App", "everything good"],
		"Quinten Alvin": ["before", "Email", "everything good"],
		"Fiona Gwyneth": ["before", "App", "everything good"],
		"Raymond Lilyrose": ["before", "App", 'missing     boots and no "stop" sign!'],
	},
};

export const DEMO_GLOBAL_DATE = "12/10";

export const COMBINED_JOBS = [
	["12/10", "51230", "Vendor1", "Roderick Corina", "before", "App", "everything good", "1:00am"],
	["12/10", "51231", "Vendor3", "Trent Bevan", "before", "App", "everything good", "9:00pm"],
	["12/10", "51231", "Vendor2", "Marina Brandon", "during", "App", "everything good", "6:00pm"],
	["12/10", "51232", "Vendor1", "Marcus Dillon", "during", "App", "no pic", "5:00pm"],
	["12/10", "51232", "Vendor2", "Marina Brandon", "", "App", "", "9:20am"],
	["12/10", "51233", "Vendor 2", "Agatha Colin", "before", "App", "everything good", "3:00pm"],
	["12/10", "51234", "", "", "", "App", "", "8:00am"],
	["12/10", "51234", "", " ", "", "App", "", "8:00am"],
	["12/10", "51234", "", "  ", "", "App", "", "8:00am"],
	["12/10", "51234", "Vendor Name", "Zane Wilford", "during", "App", "missing boots", "6:00am"],
	["12/10", "51234", "Vendor Name", "Earl Harper", "before", "App", "everything good", "6:00am"],
	["12/10", "51235", "Vendor1", "Louis Monroe", "before", "App", "only vest", "2:00pm"],
	["12/10", "51235", "Vendor1", "Cooper Peta", "before", "App", "everything good", "2:00pm"],
	["12/10", "51235", "Vendor2", "Orpha Ethan", "before", "App", "only location", "1:00pm"],
	["12/10", "51235", "Vendor2", "Hellen Natalie", "before", "App", "everything good", "1:00pm"],
	["12/10", "51236", "Vendor1", "Aleta Rosanne", "before", "App", "everything good", "8:00am"],
	["12/10", "51236", "Vendor1", "Felicia", "before", "App", "everything good", "2:00am"],
	["12/10", "51236", "Vendor1", "Sheridan Haywood", "before", "App", "everything good", "9:00am"],
	["12/10", "51236", "Vendor1", "", "before", "App", "everything good", "6:00am"],
	["12/10", "51237", "Vendor1", "Pheobe Bertha", "before", "App", "everything good", "8:00am"],
	["12/10", "51237", "Vendor1", "Franklin Narelle", "before", "App", "everything good", "6:00am"],
	["12/10", "51237", "Vendor1", "Rochelle Maude", "before", "App", "everything good", "5:00pm"],
	["12/10", "51238", "Vendor1", "Sheldon Mac", "before", "App", "everything good", "6:00am"],
	["12/10", "51238", "Vendor1", "Naomi Brennan", "during", "App", "everything good", "6:00am"],
	["12/10", "51238", "Vendor1", "Kelvin Denton", "", "App", "everything good", "6:00am"],
	["12/10", "51239", "Vendor1", "Dayna Kelley", "before", "App", "everything good", "6:00am"],
	["12/10", "51239", "Vendor1", "Cooper Isla", "before", "App", "everything good", "6:00am"],
	["12/10", "51239", "Vendor1", "Quinten Alvin", "before", "Email", "everything good", "6:00am"],
	["12/10", "51239", "Vendor1", "Fiona Gwyneth", "before", "App", "everything good", "6:00am"],
	[
		"12/10",
		"51239",
		"Vendor1",
		"Raymond Lilyrose",
		"before",
		"App",
		'missing     boots and no "stop" sign!',
		"6:00am",
	],
];
