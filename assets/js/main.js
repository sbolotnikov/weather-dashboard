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
    case n > 1 && n <= 3:
      $("#uv").css("background-color", "#afcc24");
      break;
    case n > 3 && n <= 6:
      $("#uv").css("background-color", "#d6c422");
      break;
    case n > 6 && n <= 8:
      $("#uv").css("background-color", "#cc4620");
      break;
    case n > 8 && n <= 10:
      $("#uv").css("background-color", "#bd071e");
      break;
    case n > 10:
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
function changeSystem(){
 let s=$("#system").text();
 if (s==="\xB0F"){
   $("#imp1").attr("class","hidden");
   $("#imp2").attr("class","hidden");
   $("#metr1").attr("class","");
   $("#metr2").attr("class","container");
   $("#system").text("\xB0C");
 }else{
   $("#imp1").attr("class","");
   $("#imp2").attr("class","container");
   $("#metr1").attr("class","hidden");
   $("#metr2").attr("class","hidden");
  $("#system").text("\xB0F");

 }
};
function weatherConditions(coord) {
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=imperial&exclude=minutely,hourly&appid=${apikey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $(".col-9").css("opacity", 1);



    let el = `<h2 id="cityName">${coord.name}</h2>
<h2 id="todayDate">${moment().format("dddd LL")}</h2>
<div class="row">
  <div class="col-4">
    <h3 id="weather">Current conditions: ${response.current.weather[0].description}</h3>
    <img id="cloudIcon" src="https://openweathermap.org/img/w/${response.current.weather[0].icon}.png" alt="Current Cloud coverage" width="150" height="150">
    <figure id="imp1">
      <p class="curtemp">Temperature${Math.round(response.current.temp)} \xB0F</p>
      <p class="tempFeel">Feels like: ${Math.round(response.current.feels_like)} \xB0F</p>
      <p class="tempH">High: ${Math.round(response.daily[0].temp.max)} \xB0F</p>
      <p class="tempL">Low:${Math.round(response.daily[0].temp.min)} \xB0F </p>
      <p class="wind">Wind: ${getWindDir(response.current.wind_deg)}${response.current.wind_speed}mph</p>
    </figure>
    <figure class="hidden" id="metr1">
      <p class="curtemp">Temperature${Math.round((response.current.temp - 32) * 5 / 9)} \xB0C</p>
      <p class="tempFeel">Feels like: ${Math.round((response.current.feels_like - 32) * 5 / 9)} \xB0C</p>
      <p class="tempH">High: ${Math.round((response.daily[0].temp.max - 32) * 5 / 9)} \xB0C</p>
      <p class="tempL">Low:${Math.round((response.daily[0].temp.min - 32) * 5 / 9)} \xB0C </p>
      <p class="wind">Wind: ${getWindDir(response.current.wind_deg)}${(response.current.wind_speed / 2.237).toFixed(2)}m/s</p>
    </figure>
    <p id="humidity">Humidity: ${response.current.humidity} %</p>
    <p id="ultraViolet">UV Index: <span id="uv">${response.current.uvi}</span></p>
  </div>
  <div class="col-8">
     <div id="mapid"></div>
     </div>
  </div>
</div>`
    let $currentEl = document.createElement('div');
    $currentEl.innerHTML = el;
    // $currentEl = $currentEl.firstElementChild;
    $("#currentPan").empty()
    $("#currentPan").append($currentEl)
    getUVIndexColor(response.current.uvi);
    // adding map
    const mymap = L.map('mapid').setView([coord.lat,coord.lon], 13);
    const attribution = 
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileURL,{attribution});
    tiles.addTo(mymap);
    L.marker([coord.lat,coord.lon]).addTo(mymap);




    el = `<div id="imp2">
           <div class="row ml-1 justify-content-around">           
    `
    let elM = `<div class="hidden" id="metr2">
                <div class="row ml-1 justify-content-around">               
    `
    for (var i = 1; i < 6; i++) {

      el +=
        ` <div class="col-2">
           <p class="date">${moment().add(i, 'd').format('MM/DD/YYYY')}</p>
           <p class="futureData">High: ${response.daily[i].temp.max.toFixed(0)}\xB0F</p>
           <p class="futureData">Low: ${response.daily[i].temp.min.toFixed(0)}\xB0F</p>
           <p class="futureData">${response.daily[i].weather[0].main}</p>
           <img id="cloudIcon_1" src="https://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png" alt="Cloud coverage day 1">
           <p class="futureData">Humid. ${response.daily[i].humidity}%</p>
          </div>`
      elM +=
        `
          <div class="col-2">
           <p class="date">${moment().add(i, 'd').format('MM/DD/YYYY')}</p>
           <p class="futureData">High: ${Math.round((response.daily[i].temp.max - 32) * 5 / 9)}\xB0C</p>
           <p class="futureData">Low: ${Math.round((response.daily[i].temp.min - 32) * 5 / 9)}\xB0C</p>
           <p class="futureData">${response.daily[i].weather[0].main}</p>
           <img id="cloudIcon_1" src="https://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png" alt="Cloud coverage day 1">
           <p class="futureData">Humid. ${response.daily[i].humidity}%</p>
          </div>`
    }
    el+="</div> </div>";
    $currentEl = document.createElement('div');
    $currentEl.innerHTML = el;
      // $currentEl = $currentEl.firstElementChild;
    $("#forPan").empty();    
    $("#forPan").append($currentEl);
    el+="</div> </div>";
    $currentEl = document.createElement('div');
    $currentEl.innerHTML = elM;
      // $currentEl = $currentEl.firstElementChild;    
    $("#forPan").append($currentEl)
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
    var a = $("<button>");
    // Adding a class of city to our button
    a.addClass("button");
    // Adding a data-attribute
    a.attr("data-name", cityInfo.lat + "," + cityInfo.lon);
    // Providing the initial button text
    a.text(cityInfo.name);

    // Adding the button to the btn-group div
    $(".btn-group").prepend(a);
    weatherConditions(cityInfo);
  }).catch(function (error) {
    if (error.status===404){
    alert(`uh-oh! Looks like you formatted your city name incorrectly or that city does not exist. \n\n For example: \n ❤️ correct: new york,usa \n ✖️ incorrect: new york,ny`);
    }
  });

});

// function for displaying the weatherConditions after clicking to button
$(document).on("click", ".btn-group", function (event) {
  var coor = $(event.target).attr("data-name");
  var pos = coor.search(",");
  cityInfo.lat = coor.slice(0, pos);
  cityInfo.lon = coor.slice(pos + 1);
  cityInfo.name = $(event.target).text()

  weatherConditions(cityInfo);
});

