# Check The Weather

  ## Description
  A simple, convenient way to generate README files for any repo!
  
  ## Table of Contents
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [My Goal](#my-goal)
  - [Deployment](#deployment)
  
  ## User Story
  ```
  AS A traveler
  I WANT to see the weather outlook for multiple cities
  SO THAT I can plan a trip accordingly
  ```
  
  ## Acceptance Criteria
  ```
  GIVEN a weather dashboard with form inputs
  WHEN I search for a city
  THEN I am presented with current and future conditions for that city and that city is added to the search history
  WHEN I view current weather conditions for that city
  THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
  WHEN I view future weather conditions for that city
  THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
  WHEN I click on a city in the search history
  THEN I am again presented with current and future conditions for that city
  ```
  ## My Goal

  This week, we were not given any starter code. In order for this project to be successful, my application must present a user with a simple searchable interface, autocomplete the current search query, present the current and 5-day forecast for the selected city, and save each search to the user's localstorage (if it is unique). The main challenge is getting the OpenWeather API to be called with no issues in every instance. 
  Initially, the search engine worked just fine on my local machine. However after deployment, my browser would produce an error for each search submitted.
  The solution was to add this line to the 'head' of my HTML file to allow these specific types of requests:
  ```
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
  ```

  ## Deployment
  https://dvdhyn.github.io/check-the-weather/
