"use strict";
document.addEventListener("DOMContentLoaded", function() {
    var xhr = false;
    var xhruv = false;
    var units = "metric";
    var symbol = "C";
    var temp;
document.querySelector("#toggle").addEventListener("click", toggleUnits);
function toggleUnits () {
//alert("toggled");
if (this.innerHTML === "imperial") {
temp = Math.round(temp*9/5 + 32);
units = "imperial";
symbol = "F";
this.innerHTML = "metric";
}
else {
temp = Math.round((temp-32) * 5/9);
units = "metric";
symbol = "C";
this.innerHTML = "imperial";
}
document.querySelector("#temperature").innerHTML = temp + "°" + symbol;
}
    function getLocation() {
        console.log("getLocation called");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var loni = position.coords.longitude;
                var lati = position.coords.latitude;
console.log(lati, loni);
                weatherRequest(lati, loni);
                uvRequest(lati, loni);
            });
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    getLocation();

    function weatherRequest(lati, loni) {
        console.log("weatherRequest called");
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + loni + "&units=" + units + "&APPID=f868e4b1f7dfdcb922408670cdb4f5a9";
        //console.log(url);

if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
        if (xhr) {
            xhr.onload = processResponse;
            xhr.open('GET', url);
            xhr.send();
} else {
            document.querySelector('#weather').innerHTML = 'Oops, request cannot be made.';
        }
}
function uvRequest(lati, loni) {
var uvurl = "http://api.openweathermap.org/v3/uvi/" + lati +","+ loni + ".json?APPID=f868e4b1f7dfdcb922408670cdb4f5a9";
//console.log ("uvurl: "+uvurl);
if (window.XMLHttpRequest) xhruv = new XMLHttpRequest();
        if (xhruv) {
            xhruv.onload = processUvResponse;
            xhruv.open('GET', uvurl);
            xhruv.send();
} else {
            document.querySelector('#weather').innerHTML = 'UV data not available in your area.';
        }
    }

    function processResponse(data) {
          console.log("processResponse called");
//console.log("data: " + data);
  if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status <= 400) {
      var data = JSON.parse(xhr.responseText);
var city = data.name;
document.querySelector("#location").innerHTML = city;
//console.log(city);
temp = Math.round(data.main.temp);
document.querySelector("#temperature").innerHTML = temp + "°" + symbol;
//console.log("temp"+temp);
var quality = data.weather[0].main;
//alert (quality);
document.querySelector("#quality").innerHTML = quality;
//console.log("weather" + weather);
image(quality);
    }
}
function image (quality) {
if (quality === "Clear"){
document.body.style.backgroundImage = "url('clear.jpg')";
} else if (quality === "Clouds") {document.body.style.backgroundImage = "url('cloudy.jpg')";
} else if (quality === "Rain" || quality === "Drizzle") {document.body.style.backgroundImage = "url('rain.jpg')";
} else if (quality === "Extreme") {document.body.style.backgroundImage = "url('extreme.jpg')";
}
}

function processUvResponse(uvdata) {
console.log("processUvResponse called");
var uvi = uvdata.data;
if (!uvdata.data) {document.querySelector("#uvi").innerHTML = "Have a great day!"}
//{console.log("uv data unavailable");}
else {
document.querySelector("#uvi").innerHTML = "UV Index: " + uvi;}
//{console.log(uvi);}
}

});
