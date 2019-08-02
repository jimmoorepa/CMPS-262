
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
		console.log(recordSelect);
	
	for (var i = 0; i < recordSelect; i++) {
		articleCounter++;
		console.log(articleCounter);
		var resSection = $("<div>");
		resSection.addClass("res");
		resSection.attr("id", "article-res-" + articleCounter);
		$("#res-section").append(resSection);
		
		var subSection = $("#article-details");
		subSection.addClass("details");
		$("#article-details").append(subSection);
		
		if (data.response.docs[i].headline !== "null") {
			$("#article-res-" + articleCounter)
			.append(
			  "<h3 class='articleHeadline'><span class='label label-primary'>" +
              articleCounter + "J</span><strong> " +
              data.response.docs[i].headline.main + "</strong></h3>"			    
			);			
		} 
		// Then display the remaining fields in the HTML (Section Name, Date, URL)
		//$("#res-section").append(resSection);
		
		$("#article-details-" + articleCounter)
		  .append("<h5>Section: " + data.response.docs[i].section_name + "</h5>_K");
		$("#article-details-" + articleCounter)
		  .append("<h5>" + data.response.docs[i].pub_date + "</h5>_L");
		$("#article-details-" + articleCounter)
		  .append(
			"<a href='" + data.response.docs[i].web_url + "'>" +
			data.response.docs[i].web_url + "</a>_M"
		  );
		
	} // End of main loop.
  }); // End of getting data.
} // End of main function.

$("#RunSearch").on("click", function(event) {
	
	event.preventDefault();
	// Reset the article counter.
	articleCounter = 0;
	
	$("#well-section").empty();
	
	//$('input[name=querystr]').val();
	//$("rectoshow").val();
	
	console.log($('input[name=querystr]').val());
	console.log($('input[name=rectoshow]').val());
	
	// Gets the data from the form.
	searchString = $('input[name=querystr]').val();
	searchURL = apiURL + searchString;
	displayCount = $('select[name=rectoshow]').val(); 
	startDate = $('input[name=begdate]').val(); 
	endDate = $('input[name=enddate]').val(); 
	
	// Appends start date and end date to search string.
	if (startDate !== null) {
		//searchURL = searchURL + "&begin_date=" + startDate + "0101";
	}
	if (endDate !== null) {
		//searchURL = searchURL + "&end_date=" + endDate + "0101";
	}
	
	// Displays the final query URL.
	//console.log("Search URL for API: " + searchURL);
	
	// Runs the query with form data.
	queryData(displayCount, searchURL);
});