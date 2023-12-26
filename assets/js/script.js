$(function () {
    // added the 50 largest cities in the United States
    var availableTags = [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Philadelphia",
        "Phoenix",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
        "Austin",
        "Jacksonville",
        "San Francisco",
        "Indianapolis",
        "Columbus",
        "Fort Worth",
        "Charlotte",
        "Seattle",
        "Denver",
        "El Paso",
        "Detroit",
        "Washington",
        "Boston",
        "Memphis",
        "Nashville",
        "Portland",
        "Oklahoma City",
        "Las Vegas",
        "Baltimore",
        "Louisville",
        "Milwaukee",
        "Albuquerque",
        "Tucson",
        "Fresno",
        "Sacramento",
        "Kansas City",
        "Long Beach",
        "Mesa",
        "Atlanta",
        "Colorado Springs",
        "Virginia Beach",
        "Raleigh",
        "Omaha",
        "Miami",
        "Oakland",
        "Minneapolis",
        "Tulsa",
        "Wichita",
        "New Orleans",
        "Arlington"
    ];

    var searchInput = $("#tags");
    var searchButton = $("#searchButton");
    var searchHistory = $("#searchHistory");
    var currentWeather = $("#currentWeather");
    var fiveDay = $("#fiveDayForecast");

    // displays search history from localStorage
    var savedSearches = JSON.parse(localStorage.getItem("searches")) || [];
    displaySearchHistory();

    // jQuery autocomplete
    searchInput.autocomplete({
        source: availableTags
    });

    // search button click makes API request
    searchButton.on("click", function () {
        var cityName = searchInput.val();
        getWeatherData(cityName);
    });
    // saved city button click makes API request
    searchHistory.on("click", ".city-button", function () {
        var selectedCity = $(this).text();
        getWeatherData(selectedCity);
    });

    function updateSearchHistory(cityName) {
        // checks if the city already exists in search history before adding and appending a button
        if (!savedSearches.includes(cityName)) {
            savedSearches.push(cityName);
            localStorage.setItem("searches", JSON.stringify(savedSearches));
            displaySearchHistory();
        }
    }

    function displaySearchHistory() {
        // removes existing buttons
        searchHistory.empty();
        savedSearches.forEach(function (city) {
        // appends a button for each new unique search
        searchHistory.append("<button class='city-button'>" + city + "</button>");
      });
    }
    
    // specifc city weather information populates after search
    function displayCurrentWeather(data) {
        var temperatureFahrenheit = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var date = new Date(data.dt * 1000);
        var iconCode = data.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        currentWeather.html("<h2>" + data.name + "</h2><p>Date: " + date.toLocaleString() + "</p><p>Temperature: " + temperatureFahrenheit + "°F</p><p>Humidity: " + humidity + "%</p><p>Wind Speed: " + windSpeed + " m/s</p><img src='" + iconUrl + "' alt='Weather Icon'>");
    }

    // *same input as above* specific city weather 5-day forecast populates after search
    function displayFiveDayForecast(data) {
        fiveDay.html("<h2>5-Day Forecast</h2>");
        for (var i = 0; i < data.list.length; i += 8) {
        var date = new Date(data.list[i].dt * 1000);
        var temperatureFahrenheit = ((data.list[i].main.temp - 273.15) * 9/5 + 32).toFixed(2);
        var humidity = data.list[i].main.humidity;
        var windSpeed = data.list[i].wind.speed;
        var iconCode = data.list[i].weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        fiveDay.append("<p>Date: " + date.toLocaleString() + "</p><p>Temperature: " + temperatureFahrenheit + "°F</p><p>Humidity: " + humidity + "%</p><p>Wind Speed: " + windSpeed + " m/s</p><img src='" + iconUrl + "' alt='Weather Icon'>");
        }
    }

    // pulls from the API using my OpenWeatherMap key
    // https://openweathermap.org/forecast5
    function getWeatherData(cityName) {
        var apiKey = "c210bbf2db0943be0d70f18df70a36b2";
        var geoCodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;
        $.ajax({
            url: geoCodingURL,
            method: "GET"
        }).then(function (geoData) {
            var lat = geoData[0].lat;
            var lon = geoData[0].lon;
            var currentWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        }).then(function (currentWeatherData) {
            displayCurrentWeather(currentWeatherData);
            updateSearchHistory(cityName);
        });

        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (forecastData) {
            displayFiveDayForecast(forecastData);
        });
      });
    }
  });
  