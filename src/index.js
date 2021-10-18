function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML="";
    let days =["Sun","Mon","Tue","Wed","Thu", "Fri"];
    days.forEach(function (day){
      forecastHTML = forecastHTML + `
      <div class="container-date">
        <div class="row">
          <div class="col" id="dayOne">26 Aug (${day})</div>
          <div class="col" id="tempOne">13°C | 18°C</div>
          <div class="col" id="weatherIcon">
            <i class="fas fa-cloud-showers-heavy"></i>
          </div>
        </div>
      </div>
      `;
    });
    forecastElement.innerHTML = forecastHTML;
  }
  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  function displayWeatherCondition(response) {
    document.querySelector("#searchedCity").innerHTML = response.data.name;
    document.querySelector("#mainTemperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
      celciusTemperature = response.data.main.temp;
  iconElement.setAttribute(
        "src", 
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
  iconElement.setAttribute(
        "alt", response.data.weather[0].description); 
      getForecast(response.data.coordinates); 
    }
  function searchCity(city) {
    let units = "metric";
    let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  function searchLocation(position) {
    let units = "metric";
    let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  function showFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#mainTemperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active"); 
    let fahrenheitTemperature = (celciusTemperature*9)/5+32;
    temperatureElement.innerHTML = Math.round (fahrenheitTemperature);
  }

  function showCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#mainTemperature");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round (celciusTemperature);
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#currentCityHead");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  let iconElement = document.querySelector ("#icon");

  let fahrenheitLink=document.querySelector("#fahrenheit");
  fahrenheitLink.addEventListener ("click", showFahrenheitTemperature);

  let celsiusLink=document.querySelector("#celsiusTemp");
  celsiusLink.addEventListener ("click", showCelsiusTemperature);

  let celciusTemperature = null;  
  searchCity("Lviv");
  displayForecast();