var apikey = "f408733541f79d3cc2e15ea6c311e06f";
var winddir = "";
var lon = 0;
var lat = 0;
var city = "New York,NY,USA";
var cities = [];
var cityInfo = {
  "name": "",
  "lat": 0,
  "lon": 0
};
var cloudIconURL = "https://openweathermap.org/img/w/";
var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=40.73&lon=-73.99&units=imperial&exclude=minutely,hourly&appid=${apikey}`;
function getUVIndexColor(n) {
  switch (true) {
    case n > 0 && n <= 1:
      $("#uv").css("background-color", "#41d924");
      break;
    case n > 1 && n <= 2:
      $("#uv").css("background-color", "#afcc24");
      break;
    case n > 2 && n <= 3:
      $("#uv").css("background-color", "#d6c422");
      break;
    case n > 3 && n <= 4:
      $("#uv").css("background-color", "#d29321");
      break;
    case n > 4 && n <= 5:
      $("#uv").css("background-color", "#d16b20");
      break;
    case n > 5 && n <= 6:
      $("#uv").css("background-color", "#cc4620");
      break;
    case n > 6 && n <= 7:
      $("#uv").css("background-color", "#c9071f");
      break;
    case n > 7 && n <= 8:
      $("#uv").css("background-color", "#bd071e");
      break;
    case n > 8 && n <= 9:
      $("#uv").css("background-color", "#cd0065");
      break;
    case n > 9:
      $("#uv").css("background-color", "#cd008d");
      break;
    default:
      break;

  }

}
function getWindDir(deg) {
  switch (true) {
    case deg < 11.25 || deg >= 348.75:
      return "N ";
    case deg >= 11.25 && deg < 33.75:
      return "NNE ";
    case deg >= 33.75 && deg < 56.25:
      return "NE ";
    case deg >= 56.25 && deg < 78.75:
      return "ENE ";
    case deg >= 78.75 && deg < 101.25:
      return "E ";
    case deg >= 101.25 && deg < 123.75:
      return "ESE ";
    case deg >= 123.75 && deg < 146.25:
      return "SE ";
    case deg >= 146.25 && deg < 168.75:
      return "SSE ";
    case deg >= 168.75 && deg < 191.25:
      return "S ";
    case deg >= 191.25 && deg < 213.75:
      return "SSW ";
    case deg >= 213.75 && deg < 236.25:
      return "SW ";
    case deg >= 236.25 && deg < 258.75:
      return "WSW ";
    case deg >= 258.75 && deg < 281.25:
      return "W ";
    case deg >= 281.25 && deg < 303.75:
      return "WNW ";
    case deg >= 303.75 && deg < 326.25:
      return "NW ";
    case deg >= 326.25 && deg < 348.75:
      return "NNW ";
    default:
      return "No Wind";
  }
}

function weatherConditions(coord) {
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=imperial&exclude=minutely,hourly&appid=${apikey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(JSON.stringify(response));
    console.log(coord);
    $("#todayDate").text(moment().format("dddd LL"));
    $("#cityName").text(coord.name);
    cloudIconURL = "https://openweathermap.org/img/w/" + response.current.weather[0].icon + ".png";
    $("#cloudIcon").attr("src", cloudIconURL);
    $("#weather").text("Current conditions: " + response.current.weather[0].main);
    $("#curtemp").text("Temperature: " + Math.floor(response.current.temp) + "\xB0F");
    $("#tempH").text("High: " + Math.floor(response.daily[0].temp.max) + "\xB0F");
    $("#tempL").text("Low: " + Math.floor(response.daily[0].temp.min) + "\xB0F");
    $("#humidity").text("Humidity: " + response.current.humidity + "%");
    $("#wind").text("Wind: " + getWindDir(response.current.wind_deg) + response.current.wind_speed + " mph");
    $("#uv").text(response.current.uvi);
    getUVIndexColor(response.current.uvi);
    for (var i = 1; i < 6; i++) {
      $("#date_" + i).text(moment().add(i, 'd').format('MM/DD/YYYY'));
      $("#tempH_" + i).text("High: " + response.daily[i].temp.max.toFixed(0) + "\xB0F");
      $("#tempL_" + i).text("Low: " + response.daily[i].temp.min.toFixed(0) + "\xB0F");
      $("#weather_" + i).text(response.daily[i].weather[0].main);
      $("#cloudIcon_" + i).attr("src", "https://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png");
      $("#humidity_" + i).text("Humid. : " + response.daily[i].humidity + "%");
    }
  });
  
};
// This function handles events where one button is clicked
$("#add-city").on("click", function (event) {
  event.preventDefault();
  cityInfo.name = $("#city-input").val().trim();
  $("#city-input").val("");
  var locatequeryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInfo.name + '&appid=' + apikey;
  $.ajax({
    url: locatequeryURL,
    method: "GET",
  }).then(function (response) {
   
    cityInfo.lat = response.coord.lat;
    cityInfo.lon = response.coord.lon;
    // $(".col-9").attr("display", "flex");
    var a = $("<button>");
    // Adding a class of city to our button
    a.addClass("button");
    // Adding a data-attribute
    a.attr("data-name",cityInfo.lat+","+cityInfo.lon);
    // Providing the initial button text
    a.text(cityInfo.name);

    // Adding the button to the btn-group div
    $(".btn-group").prepend(a);
    weatherConditions(cityInfo); 
    console.log(cityInfo);
  });
  
});

// function for displaying the weatherConditions after clicking to button
$(document).on("click", ".btn-group", function (event) {
  var coor = $(event.target).attr("data-name");
  var pos = coor.search(",");
  cityInfo.lat=coor.slice(0,pos);
  cityInfo.lon=coor.slice(pos+1);
  cityInfo.name=$(event.target).text()
 
  weatherConditions(cityInfo);
});

