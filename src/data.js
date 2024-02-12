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

const PARSED_DEMO_SYSTEM = [
	{
		"Confirmation": "51230",
		"Vendor": "Vendor1",
		"Worker Name": "Roderick Corina",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51230",
		"Vendor": "Vendor2",
		"Worker Name": "Trent Bevan",
		"Start Time": "9:00 AM"
	},
	{
		"Confirmation": "51230",
		"Vendor": "Vendor1",
		"Worker Name": "Marcus Dillon",
		"Start Time": "5:00 PM"
	},
	{
		"Confirmation": "51231",
		"Vendor": "Vendor2",
		"Worker Name": "Marina Brandon",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51231",
		"Vendor": "Vendor1",
		"Worker Name": "Marina Brandon",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51231",
		"Vendor": "Vendor2",
		"Worker Name": "Marina Brandon",
		"Start Time": "6:00 PM"
	},
	{
		"Confirmation": "51231",
		"Vendor": "Vend@r 2",
		"Worker Name": "Marina Brandon",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51231",
		"Vendor": "   Vendor2  ",
		"Worker Name": "Marina Brandon",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51232",
		"Vendor": "Vendor2",
		"Worker Name": "Trent Bevan",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51233",
		"Vendor": "",
		"Worker Name": "",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51233",
		"Vendor": "",
		"Worker Name": "",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51233",
		"Vendor": "",
		"Worker Name": "",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51233",
		"Vendor": "Vendor1",
		"Worker Name": "",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51_234",
		"Vendor": "Vendor1",
		"Worker Name": "Louis Monroe",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "100051234",
		"Vendor": "Vendor1",
		"Worker Name": "Cooper Peta",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "00051234",
		"Vendor": "Vendor2",
		"Worker Name": "Orpha Ethan",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "-0_10abc0@0_5,1.234",
		"Vendor": "Vendor1",
		"Worker Name": "Hellen Natalie",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51235",
		"Vendor": "Vendor1",
		"Worker Name": " aleta_ rosanne ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51235",
		"Vendor": "Vendor1",
		"Worker Name": "         FElICIa       ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51235",
		"Vendor": "Vendor1",
		"Worker Name": " !!@# Sh##eridan456 Haywood 123",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51235",
		"Vendor": "Vendor1",
		"Worker Name": "",
		"Start Time": "6:00 AM"
	},
	{
		"Confirmation": "51236",
		"Vendor": "Vendor1",
		"Worker Name": "Pheobe Bertha",
		"Start Time": "8:00 aM"
	},
	{
		"Confirmation": "51236",
		"Vendor": "Vendor1",
		"Worker Name": "Franklin Narelle",
		"Start Time": "  8: 00 Am"
	},
	{
		"Confirmation": "51236",
		"Vendor": "Vendor1",
		"Worker Name": "Rochelle Maude",
		"Start Time": " bdfgh 8!!:00 PM()#$"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Sheldon Mac ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Naomi Brennan ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Kelvin Denton ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Dayna Kelley ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Cooper Isla ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Quinten Alvin ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Fiona Gwyneth ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Raymond Lilyrose ",
		"Start Time": "8:00 AM"
	},
	{
		"Confirmation": "51237",
		"Vendor": "Vendor1",
		"Worker Name": " Linsey Robert ",
		"Start Time": "8:00 AM"
	}]
const sum = {
    "Roderick Corina": [{
        "Confirmation": [51230, "51230"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Roderick Corina", "Roderick Corina"],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Trent Bevan": [{
            "Confirmation": [51230, "51230"],
            "Vendor": ["Vendor2", "Vendor2"],
            "Worker Name": ["Trent Bevan", "Trent Bevan"],
            "Start Time": ["9:00 AM", "9:00 AM"]
        },
        {
            "Confirmation": [51232, "51232"],
            "Vendor": ["Vendor2", "Vendor2"],
            "Worker Name": ["Trent Bevan", "Trent Bevan"],
            "Start Time": ["8:00 AM", "8:00 AM"]
        }
    ],
    "Marcus Dillon": [{
        "Confirmation": [51230, "51230"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Marcus Dillon", "Marcus Dillon"],
        "Start Time": ["5:00 AM", "5:00 PM"]
    }],
    "Marina Brandon": [{
            "Confirmation": [51231, "51231"],
            "Vendor": ["Vendor2", "Vendor2"],
            "Worker Name": ["Marina Brandon", "Marina Brandon"],
            "Start Time": ["8:00 AM", "8:00 AM"]
        },
        {
            "Confirmation": [51231, "51231"],
            "Vendor": ["Vendor1", "Vendor1"],
            "Worker Name": ["Marina Brandon", "Marina Brandon"],
            "Start Time": ["8:00 AM", "8:00 AM"]
        },
        {
            "Confirmation": [51231, "51231"],
            "Vendor": ["Vendor2", "Vendor2"],
            "Worker Name": ["Marina Brandon", "Marina Brandon"],
            "Start Time": ["6:00 AM", "6:00 PM"]
        },
        {
            "Confirmation": [51231, "51231"],
            "Vendor": ["Vendr 2", "Vend@r 2"],
            "Worker Name": ["Marina Brandon", "Marina Brandon"],
            "Start Time": ["8:00 AM", "8:00 AM"]
        },
        {
            "Confirmation": [51231, "51231"],
            "Vendor": [" Vendor2 ", "   Vendor2  "],
            "Worker Name": ["Marina Brandon", "Marina Brandon"],
            "Start Time": ["8:00 AM", "8:00 AM"]
        }
    ],
    "": [{
            "Confirmation": [51233, "51233"],
            "Vendor": ["", ""],
            "Worker Name": ["", ""],
            "Start Time": ["8:00 AM", "8:00 AM"]
        },
        {
            "Confirmation": [51233, "51233"],
            "Vendor": ["", ""],
            "Worker Name": ["", ""],
            "Start Time": ["8:00 AM", "8:00 AM"]
        },
        {
            "Confirmation": [51233, "51233"],
            "Vendor": ["", ""],
            "Worker Name": ["", ""],
            "Start Time": ["8:00 AM", "8:00 AM"]
        },
        {
            "Confirmation": [51233, "51233"],
            "Vendor": ["Vendor1", "Vendor1"],
            "Worker Name": ["", ""],
            "Start Time": ["8:00 AM", "8:00 AM"]
        },
        {
            "Confirmation": [51235, "51235"],
            "Vendor": ["Vendor1", "Vendor1"],
            "Worker Name": ["", ""],
            "Start Time": ["6:00 AM", "6:00 AM"]
        }
    ],
    "Louis Monroe": [{
        "Confirmation": [51234, "51_234"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Louis Monroe", "Louis Monroe"],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Cooper Peta": [{
        "Confirmation": [51234, "100051234"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Cooper Peta", "Cooper Peta"],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Orpha Ethan": [{
        "Confirmation": [51234, "00051234"],
        "Vendor": ["Vendor2", "Vendor2"],
        "Worker Name": ["Orpha Ethan", "Orpha Ethan"],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Hellen Natalie": [{
        "Confirmation": [51234, "-0_10abc0@0_5,1.234"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Hellen Natalie", "Hellen Natalie"],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Aleta Rosanne": [{
        "Confirmation": [51235, "51235"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Aleta Rosanne", " aleta_ rosanne "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Felicia": [{
        "Confirmation": [51235, "51235"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Felicia", "         FElICIa       "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Sheridan Haywood": [{
        "Confirmation": [51235, "51235"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Sheridan Haywood", " !!@# Sh##eridan456 Haywood 123"],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Pheobe Bertha": [{
        "Confirmation": [51236, "51236"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Pheobe Bertha", "Pheobe Bertha"],
        "Start Time": ["8:00 AM", "8:00 aM"]
    }],
    "Franklin Narelle": [{
        "Confirmation": [51236, "51236"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Franklin Narelle", "Franklin Narelle"],
        "Start Time": ["8:00 AM", "  8: 00 Am"]
    }],
    "Rochelle Maude": [{
        "Confirmation": [51236, "51236"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Rochelle Maude", "Rochelle Maude"],
        "Start Time": ["8:00 AM", " bdfgh 8!!:00 PM()#$"]
    }],
    "Sheldon Mac": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Sheldon Mac", " Sheldon Mac "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Naomi Brennan": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Naomi Brennan", " Naomi Brennan "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Kelvin Denton": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Kelvin Denton", " Kelvin Denton "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Dayna Kelley": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Dayna Kelley", " Dayna Kelley "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Cooper Isla": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Cooper Isla", " Cooper Isla "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Quinten Alvin": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Quinten Alvin", " Quinten Alvin "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Fiona Gwyneth": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Fiona Gwyneth", " Fiona Gwyneth "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Raymond Lilyrose": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Raymond Lilyrose", " Raymond Lilyrose "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }],
    "Linsey Robert": [{
        "Confirmation": [51237, "51237"],
        "Vendor": ["Vendor1", "Vendor1"],
        "Worker Name": ["Linsey Robert", " Linsey Robert "],
        "Start Time": ["8:00 AM", "8:00 AM"]
    }]
}

// prettier-ignore
export const PARSED_DEMO_SHEET = [
	[""],
	["12/10", "51230", "Vendor1", "Roderick Corina", "before", "App", "everything good", "1:00 AM"],
	[""],
	["12/10/2023", "51231", "Vendor1", "Trent Bevan", "before", "App", "everything good", "2:00 AM"],
	["Dec 10 2023", "51232", "Vendor1", "Marcus Dillon", "during", "App", "no pic", "2:20 AM"],
	["././.dEc.10/2023 /", "51231", "Vendor1", "Marina Brandon", "during", "App", "everything good", "2:20 AM"],
	['"-2023/#^@%#^12/   10"', "51233", "Vendor1", "Agatha Colin", "before", "App", "everything good", "2:20 AM"],
	[""],
	["12/10", "51234", "Vendor Name", "Zane Wilford", "during", "App", "missing boots", "1:00 AM"],
	["12/10", "51234", "Vendor  N#@ame", "Earl Harper", "before", "App", "everything good", "1:00 AM"],
	[""],
	["12/10", "51_235", "Vendor1", "Louis Monroe", "before", "App", "only vest", "1:00 AM"],
	["12/10", "100051235", "Vendor1", "Cooper Peta", "before", "App", "everything good", "1:00 AM"],
	["12/10", "00051235", "Vendor1", "Orpha Ethan", "before", "App", "only location", "1:00 AM"],
	["12/10", "-0_10abc0@0_5,1.235", "Vendor2", "Hellen Natalie", "before", "App", "everything good", "1:00 AM"],
	[""],
	["12/11", "51236", "Vendor1", "aleta_ rosanne", "before", "App", "everything good", "12:00 AM"],
	["12/11", "51236", "Vendor1", "FElICIa", "before", "App", "everything good", "12:00 PM"],
	["12/11", "51236", "Vendor1", "!!@# Sh##eridan456 Haywood", "before", "App", "everything good", "1:00 AM"],
	["12/11", "51236", "Vendor1", "", "before", "App", "everything good", "11:00 AM"],
	[""],
	["12/10", "51238", "Vendor1", "Sheldon Mac", "be  fore", "App", "everything good", "11:00 AM"],
	["12/10", "51238", "Vendor1", "Naomi Brennan", "d#@!ur^*&ing", "App", "everything good", "11:00 AM"],
	["12/10", "51238", "Vendor1", "Kelvin Denton", "", "App", "everything good", "11:00 AM"],
	[""],
	["12/12", "51239", "Vendor1", "Dayna Kelley", "before", "app", "everything good", "12:00 AM"],
	["12/12", "51239", "Vendor1", "Cooper Isla", "before", "a #@p*&*@p!!", "everything good", "12:00 AM"],
	["12/12", "51239", "Vendor1", "Quinten Alvin", "before", "E2662m@@ail!@", "everything good", "12:00 AM"],
	["12/12", "51239", "Vendor1", "Fiona Gwyneth", "before", "", "everything good", "2:00 AM"],
	[""],
	["12/10", "51239", "Vendor1", "Raymond Lilyrose", "before", "App", 'missing     boots and no "stop" sign!', "3:00 PM"],
	[""],
	["12/10", "51237", "Vendor1", "Pheobe Bertha", "before", "App", "everything good", "8 :00 aM"],
	["12/10", "51237", "Vendor1", "Franklin Narelle", "before", "App", "everything good", "6 :00 Am"],
	["12/10", "51237", "Vendor1", "Rochelle Maude", "before", "App", "everything good", "bdfgh 5 !!:00 PM()#$"],
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

// prettier-ignore
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
	["12/10", "51239", "Vendor1", "Raymond Lilyrose", "before", "App", 'missing     boots and no "stop" sign!', "6:00am"],
];

const BETTER_JOB_MAP = {
	"Naomi Brennan": [
		{
			"OG Name": " noami BreNNan",
			"Date": ["12/10", " 12/ 10"],
			"Confirmation": ["51239", "100051239"],
			"Vendor": ["Vendor 1", "  Vendor 1"],
			"Start Time": ["8:00am", "8:00 am"],
		},
	],
	"Quinten Alvin": [
		{
			"OG Name": " Quinten Alvin",
			"Confirmation": ["51237", "-51s23a7"],
			"Vendor": ["Vendor 1", "  Vendor 1"],
			"Start Time": ["9:00am", "  9:00 am"],
		},
		{
			"OG Name": " Quinten aLvin",
			"Confirmation": ["51237", "  51237"],
			"Vendor": ["Vendor 2", "Vendor 2  "],
			"Start Time": ["9:00am", "ajfg9:00 a m "],
		},
	],
	"Fiona Gwyneth": [
		{
			"OG Name": "Fiona G@@wyneth",
			"Confirmation": ["51235", "51235"],
			"Vendor": ["Vendor 1", "Vendor   1"],
			"Start Time": ["2:00am", "2:00am"],
		},
		{
			"OG Name": "Fiona Gw12yneth",
			"Confirmation": ["51235", "512@#35"],
			"Vendor": ["Vendor 1", " Vendor 1 "],
			"Start Time": ["8:00pm", "8:00 PM"],
		},
	],
};

const BETTER_SYSTEM_MAP = {
	"Naomi Brennan": [
		{
			"OG Name": " noami BreNNan",
			"Date": ["12/10", " 12/ 10"],
			"Confirmation": ["51239", "100051239"],
			"Vendor": ["Vendor 1", "  Vendor 1"],
			"Start Time": ["8:00am", "8:00 am"],
		},
	],
	"Quinten Alvin": [
		{
			"OG Name": " Quinten Alvin",
			"Date": ["12/10", "12 / 10 "],
			"Confirmation": ["51237", "-51s23a7"],
			"Vendor": ["Vendor 1", "Vendor 1"],
			"Start Time": ["9:00am", "  9:00 am"],
		},
		{
			"OG Name": "Quinten A@lvin  ",
			"Date": ["12/10", " 12/10"],
			"Confirmation": ["51237", "  51237"],
			"Vendor": ["Vendor 2", "Vendor 2  "],
			"Start Time": ["9:00am", "ajfg9:00 a m "],
		},
	],
	"Pheobe Bertha": [
		{
			"OG Name": "Pheobe  Bertha",
			"Date": ["12/11", "12 / 11"],
			"Confirmation": ["51235", "51235"],
			"Vendor": ["Vendor 1", "Vendor   1"],
			"Start Time": ["2:00am", "2:00am"],
		},
	],
};
