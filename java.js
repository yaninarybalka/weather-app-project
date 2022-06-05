function displayDate(currentTime) {
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = currentTime.getMinutes();

  if (minute < 10) {
    minute = `0${minute} `;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];
  let dateInfo = document.querySelector("#current-time");
  dateInfo.innerHTML = `${day}, ${hour}:${minute}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0e951398a3cfa9bd7988ab651edd4068";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;

  celciusTemp = response.data.main.temp;

  let temperature = Math.round(celciusTemp);
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = `${temperature}`;

  let realTemp = document.querySelector("#feels-like");
  let realTempValue = Math.round(response.data.main.feels_like);
  realTemp.innerHTML = `${realTempValue}° C`;

  let wind = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed}m/s`;

  let humidity = document.querySelector("#humidity");
  let humidityValue = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityValue}%`;

  let weatherDescription = document.querySelector(
    "#current-weather-description"
  );
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let cityIcon = document.querySelector("#city-icon");
  let iconElement = response.data.weather[0].icon;
  cityIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconElement}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "0e951398a3cfa9bd7988ab651edd4068";
  let endPoint =
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-button").value;
  searchCity(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let longt = position.coords.longitude;
  let apiKey = "0e951398a3cfa9bd7988ab651edd4068";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longt}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celciusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function formatForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecast = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecast =
        forecast +
        `<div class="col day1">
                <div class="day-name">${formatForecast(forecastDay.dt)}</div>
                <div class="weather-picture"> <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"  width="50">  </img></div>
                <div class="day-temperature"><strong> ${Math.round(
                  forecastDay.temp.max
                )}° </strong> / ${Math.round(forecastDay.temp.min)}°C</div>
              </div>`;
    }
  });

  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}

let celciusTemp = null;

let celsiusLink = document.querySelector("#celsius-sign");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#farenheit-sign");
fahrenheitLink.addEventListener("click", showFahrenheit);

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

let geoButton = document.querySelector("#geolocation-button");
geoButton.addEventListener("click", getCurrentLocation);

displayDate(new Date());

searchCity("Ternopil");
