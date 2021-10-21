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
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
  }
  function displayForecast(response){
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    let forecastHTML="";
    
    forecast.forEach(function (forecastDay, index){
      if (index <5) {
      forecastHTML = forecastHTML + `
      <div class="container-date">
        <div class="row">
          <div class="col" id="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <div class="col" id="weather-forecast-temperatures"> 
             <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span> | <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span> 
          </div>
          <div class="col" id="weather-forecast-icon">
            <img  
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].description
                }@2x.png"
            width="50"
            />
          </div>
        </div>
      </div>
      `;}
    });
    forecastElement.innerHTML = forecastHTML;
  }
  function getForecast(coordinates) {
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

  
      getForecast(response.data.coord); 
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
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#currentCityHead");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  let iconElement = document.querySelector ("#icon");
  let celciusTemperature = null;  
  searchCity("Lviv");
 