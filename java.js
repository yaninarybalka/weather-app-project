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

function displayTemp(response) {
  console.log(response);

  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
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

displayDate(new Date());

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

let geoButton = document.querySelector("#geolocation-button");
geoButton.addEventListener("click", getCurrentLocation);

searchCity("Ternopil");
