$(document).ready(function() {
  $("#submit").click(wikiSearch);
  $("#search").keypress(function(e) {
    if (e.keyCode == 13) {
      wikiSearch();
    };
  });
  $("#search").on("click", function() {
    $(this).select();
  });
  $("#search").change(function() {
    $("#searchResults").empty();
  });
  var checkInput = "";
    
    function wikiSearch() {
      var userInput = $("#search").val();
      //console.log(userInput);
      if (checkInput == userInput) {
        return;
      };
      checkInput = userInput;
      var API = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=" + userInput + "&srsearch=" + userInput + "&srlimit=10&sroffset=0&srprop=snippet"+ "&origin=*"
      //console.log(API);
      var offset = 0;
      $.getJSON(API, displayResults);
      
      function displayResults(results) {
        //console.log(results);
        //console.log(results.query.search[0].title);
        //console.log(results.hasOwnProperty("continue"));
        for (i = 0; i < results.query.search.length; i++) {
          $("div#searchResults").append("<a href='https://en.wikipedia.org/wiki/" + results.query.search[i].title + "' target='_blank'><div class='eachResult'><p id='resultTitle'>" + results.query.search[i].title + "</p> <p id='resultText'>" + results.query.search[i].snippet + "...</div></a>");
        };
        if (results.hasOwnProperty("continue")) {
          $("div#searchResults").append("<a href='#'><div class='continueButton'>Get more results</div></a>");
        } else {
          $("div#searchResults").append("<div class='continueButton'>No further results to display</div>");
        };
        offset = results.continue.sroffset;
        //console.log(offset);
    };
    
    $(document).off().on("click", ".continueButton", function(e) {
      //console.log(offset);
      e.preventDefault();
      API = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=" + userInput + "&srsearch=" + userInput + "&srlimit=10&sroffset=" + offset + "&srprop=snippet"+ "&origin=*" + "&continue=-%7C%7C"
      $.getJSON(API, displayResults);
      //console.log(results.continue.sroffset);
      //console.log(API);
      $("html, body").animate({scrollTop: $(this).offset().top}, 1000); 
    });
  };
});