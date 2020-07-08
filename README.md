# 06 Server-Side APIs: Weather Dashboard

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

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
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

The following image demonstrates needed the application functionality:

![weather dashboard demo](/assets/06-server-side-demo.png)

## Review
![weather dashboard demo](/assets/presentation.gif)
features presentation in 15 seconds
![weather dashboard demo](/assets/1-Start-screen.png)
Greeting screen with saved cities and input form
![weather dashboard demo](/assets/2-alert-on-wrong-input.png)
In case input cities was not found alert popsup 
![weather dashboard demo](/assets/3-current-dashboard-with-background.png)
Current weather dashboard look
![weather dashboard demo](/assets/4-list-of-maps-used-switchto-Celsious.png)
List of maps displayed from openweathermap API using leaflet API and openstreetmap tiles and switching to Celsious
![weather dashboard demo](/assets/5-diffrent-city-click.png)
You can choose diffrent city also it change background from rapidapi API
![weather dashboard demo](/assets/6-temperature-layer-map&forecast.png)
shows different map from default
![weather dashboard demo](/assets/7-mobile-look.png)
it adjust to mobile screen
![weather dashboard demo](/assets/8-iPAD-look.png)
or IPAD
Submitted the following for review:

* The URL of the deployed application. https://sbolotnikov.github.io/weather-dashboard/

* The URL of the GitHub repository. https://github.com/sbolotnikov/weather-dashboard

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
