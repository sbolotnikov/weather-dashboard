var apikey="f408733541f79d3cc2e15ea6c311e06f";
  var city='Bujumbura,Burundi';
   var queryURL='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apikey;
  // Retrieved data will be dumped here
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

  });