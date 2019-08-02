
var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
var apitext = '&api-key=';
var myKey = 'api-key=' + 'm1YBPscqkLm24fni6bm3ZZTnbSpVHv8Q';
 
var queryText = 'mgm';

var apiURL = url + myKey + "&q="; // + query;

// Variables to hold the form data.
var searchString = "";
var displayCount = "";
var startDate = "";
var endDate = "";

var searchURL = "";

var articleCounter = 0;

// My Functions


function queryData(recordSelect, queryURL) {
  $.ajax({
	url: queryURL,
	method: "GET"
  }).done(function(data) {
	
	//Console log the query URL.
	console.log("Query URL = " + queryURL);
	
	for (var i = 0; i < recordSelect; i++) {
		articleCounter++;
		var resSection = $("<div>");
		resSection.addClass("well");
		resSection.attr("id", "article-well-" + articleCounter);
		$("#well-section").append(wellSection);
		
		if (data.response.docs[i].headline !== "null") {
			$("#article-well-" + articleCounter)
			.append(
			  "<h3 class='articleHeadline'><span class='label label-primary'>" +
              articleCounter + "</span><strong> " +
              data.response.docs[i].headline.main + "</strong></h3>"
			);
		} 
		// Then display the remaining fields in the HTML (Section Name, Date, URL)
		$("#articleWell-" + articleCounter)
		  .append("<h5>Section: " + data.response.docs[i].section_name + "</h5>");
		$("#articleWell-" + articleCounter)
		  .append("<h5>" + data.response.docs[i].pub_date + "</h5>");
		$("#articleWell-" + articleCounter)
		  .append(
			"<a href='" + data.response.docs[i].web_url + "'>" +
			data.response.docs[i].web_url + "</a>"
		  );
		
	} // End of main loop.
  }); // End of getting data.
} // End of main function.

$("#RunSearch").on("click", function() {
	
	// Reset the article counter.
	articleCounter = 0;
	
	$("#well-section").empty();
	
	console.log($("querystr").val().trim());
	
	// Gets the data from the form.
	searchString = $("querystr").val().trim();
	searchURL = apiURL + searchString;
	displayCount = $("recordsSelect").val(); //.trim();
	startDate = $("begdate").val(); //.trim();
	endDate = $("enddate").val(); //.trim();
	
	// Appends start date and end date to search string.
	if ($("begdate").val() !== null) {
		//searchURL = searchURL + "&begin_date=" + startDate + "0101";
	}
	if ($("enddate").val() !== null) {
		//searchURL = searchURL + "&end_date=" + endDate + "0101";
	}
	
	// Displays the final query URL.
	console.log("Search URL for API: " + searchURL);
	
	// Runs the query with form data.
	queryData(displayCount, searchURL);
});