"use strict";
document.addEventListener("DOMContentLoaded", function() {
    var xhr = false;
    var xhruv = false;
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
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + loni + "&units=metric&APPID=f868e4b1f7dfdcb922408670cdb4f5a9";
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
console.log(city);
var temp = data.main.temp;
console.log("temp"+temp);
var weather = data.weather[0].main;
console.log("weather" + weather);

    }
}

function processUvResponse(uvdata) {
console.log("processUvResponse called");
var uvi = uvdata.data;
if (!uvdata.data) {console.log("uv data unavailable");}
else {console.log(uvi);}
}
});

 // function toggleUnits() {
 //        if (countryUnits === 'metric') {                           // check if currently set to imperial or metric.
 //            tempSymbol = 'F';
 //            windSymbol = 'miles/hour';
 //            countryUnits = 'imperial';
 //            pressureSymbol = 'mb';
 //            button.innerHTML = 'Use Metric Units';
 //            temperature = Math.round((temperature * 9 / 5) + 32);       // convert temperature to 'fahrenheit'.
 //            displayTemperature.innerHTML = temperature;
 //            displayDegreeSymbol.innerHTML = " &deg;" + tempSymbol;
 //            windSpeed = Math.round(windSpeed / 1.609344);               // convert wind speed to 'miles/hr'.
 //            displayWinds.innerHTML = "Winds " + windDirection + " " + windSpeed + " " + windSymbol;
 //            pressure = pressure * 10;                                   // convert pressure to 'mb'.
 //            displayPressure.innerHTML = "Barometric Pressure: " + pressure + " " + pressureSymbol;
 //        }
 //        else {
 //            tempSymbol = 'C';
 //            countryUnits = 'metric';
 //            windSymbol = 'km/hour';
 //            pressureSymbol = 'kPa';
 //            button.innerHTML = 'Use Imperial Units';
 //            temperature = Math.round((temperature - 32) * 5 / 9);       // convert temperature to 'celsius'.
 //            displayTemperature.innerHTML = temperature;
 //            displayDegreeSymbol.innerHTML = " &deg;" + tempSymbol;
 //            windSpeed = Math.round(windSpeed * 1.609344);               // convert wind speed to 'Km/h'.
 //            displayWinds.innerHTML = "Winds " + windDirection + " " + windSpeed + " " + windSymbol;
 //            pressure = pressure / 10;                                   // convert pressure to'KPa'.
 //            displayPressure.innerHTML = "Barometric Pressure: " + pressure + " " + pressureSymbol;
 //        }
 //    }
