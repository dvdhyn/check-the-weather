$( function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );


var citySearch = document.getElementById("searchButton");
var searchInput = document.getElementById("tags");
var searchButton = document.getElementById("searchButton");
var searchHistory = document.getElementById("searchHistory");
var currentWeather = document.getElementById("currentWeather");
var fiveDay = document.getElementById("fiveDayForecast");


var tags = document.getElementById("tags");


var apiKey = "c210bbf2db0943be0d70f18df70a36b2";
var lat;
var lon;
var geoCoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + tags + "&limit=5&appid=" + apiKey;
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
