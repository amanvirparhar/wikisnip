$.ajaxSetup({
	async: false
});

var body;

function summary(txt) {
	$.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=" + txt, function (data) {
		if (txt != " ") {
			if (data.query.pages[Object.keys(data.query.pages)[0]].extract) {
				if (!data.query.pages[Object.keys(data.query.pages)[0]].extract.includes("may refer to") && txt != "") {
					$.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=" + data.query.pages[Object.keys(data.query.pages)[0]].pageid + "&inprop=url&origin=*&format=json", function (res) {
						var para = v.truncate(data.query.pages[Object.keys(data.query.pages)[0]].extract, 450);
						var url = res.query.pages[Object.keys(data.query.pages)[0]].fullurl;
						body = "<p style='font-size: 125%; font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif; line-height: 125%;'>" + para + " " + "<a href='" + url + "' target='_blank' style='text-decoration: underline;'>(read more)</a></p>";
					});
				} else if (data.query.pages[Object.keys(data.query.pages)[0]].extract.includes("refer to")) {
					$.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=" + data.query.pages[Object.keys(data.query.pages)[0]].pageid + "&inprop=url&origin=*&format=json", function (res) {
						var url = res.query.pages[Object.keys(data.query.pages)[0]].fullurl;
						body = "<p style='font-size: 125%; font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif; line-height: 125%; text-decoration: underline;'><a href='" + url + "' target='_blank'>Multiple entries found. Click to open page.</a></p>";
					});
				} else {
					body = "<p style='font-size: 125%; font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif; line-height: 125%;'>No entry found.</p>";
				}
			} else {
				body = "<p style='font-size: 125%; font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif; line-height: 125%;'>No entry found.</p>";
			}
		} else {
			body = "<p style='font-size: 125%; font-family: Gill Sans,Gill Sans MT,Calibri,sans-serif; line-height: 125%;'>No entry found.</p>";
		}
	});
};

$.tooltipster.startSelectable(
	':not(:has(input)):not(input):not(textarea)',
	function (instance, text) {
		summary(text);
		return body;
	},
	{ animation: 'grow', theme: 'tooltipster-shadow', contentAsHTML: 'true', interactive: 'true', maxWidth: $(window).width() * 0.65 }
);