var timeOfDay = document.querySelector(".timeOfDay");
var weatherText = document.querySelector(".weather");
var locationText = document.querySelector(".location");
var weatherIcon = document.querySelector(".weatherIcon");
var check = document.querySelector("#check");

// greet user with time of day

var today = new Date();
var curHr = today.getHours();

if (curHr < 12) {
  timeOfDay.innerHTML = "Good Morning!";
  document.querySelector("body").setAttribute("class", "morning");
} else if (curHr < 18) {
  timeOfDay.innerHTML = "Good Afternoon!";
  document.querySelector("body").setAttribute("class", "afternoon");
} else {
  timeOfDay.innerHTML = "Good Evening!";
  document.querySelector("body").setAttribute("class", "evening");
}

// convert celcius to farenheit

function toFarenheit(temp) {
  return temp * 9 / 5 + 32;
}

//store lat and long into variables

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    $.getJSON(
      "https://fcc-weather-api.glitch.me/api/current?lon=" +
        lon +
        "&lat=" +
        lat,
      function(json) {
        console.log(json.weather[0]);
        locationText.innerHTML = json.name;
        weatherText.innerHTML = toFarenheit(Math.round(json.main.temp));
        if (json.weather[0].description.indexOf("clouds") !== -1) {
          weatherIcon.innerHTML =
            "<i class='wi wi-day-cloudy' style='font-size: 7em'></i>";
        } else if (json.weather[0].description.indexOf("clear sky") !== -1) {
          weatherIcon.innerHTML =
            "<i class='wi wi-day-sunny' style='font-size: 7em'></i>";
        } else if (json.weather[0].description.indexOf("rain") !== -1) {
          weatherIcon.innerHTML =
            "<i class='wi wi-rain-wind' style='font-size: 2.75em'></i>";
        }

        check.addEventListener("change", function() {
          if (this.checked) {
            weatherText.innerHTML = Math.round(json.main.temp);
          } else {
            weatherText.innerHTML = Math.round(toFarenheit(json.main.temp));
          }
        });
      },
      { timeout: 10000 }
    );
  });
}

//make curse at the end of the header blink, as if the user is communicating with a CLI version of Willard Scott
function cursor() {
  $("#cursor")
    .animate(
      {
        opacity: 0
      },
      "fast",
      "swing"
    )
    .animate(
      {
        opacity: 1
      },
      "fast",
      "swing"
    );
}

$(document).ready(function() {
  setInterval("cursor()", 700);
});
