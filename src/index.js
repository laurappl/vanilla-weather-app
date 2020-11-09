function formatDate(timestamp) {
    let date = new Date(timestamp);
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;
  }
  
  function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${hours}:${minutes}`;
  }

function displayTemperature (response) {
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    

let iconData = response.data.weather[0].icon;
    let iconLink = `http://openweathermap.org/img/wn/${iconData}@2x.png`;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", iconLink);
    iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png` );
   celciusTemperature = response.data.main.temp;

   let quoteElement = document.querySelector("#weather-quote");
   if (iconData === "50d" || iconData === "50n") {quoteElement.innerHTML = `"Sometimes love gets lost in a fog"`;  
} else if (iconData === "01d" || iconData === "01n") {quoteElement.innerHTML = `"To love and be loved is to feel the sun from both sides"`;

} else if (iconData === "02d" || iconData === "02n") {quoteElement.innerHTML = `"Love is like the sun coming out of the clouds and warming your soul"`;

} else if (iconData === "03d" || iconData === "03n") {quoteElement.innerHTML = `"You make me happy when skies are grey ❤"`;
} else if (iconData === "04d" || iconData === "04n") {quoteElement.innerHTML = `"The sun always shine above the clouds"`;
} else if (iconData === "09d" || iconData === "09n") {quoteElement.innerHTML = `"Rain showers my spirit and waters my soul"`;    
} else if (iconData === "10d" || iconData === "10n") {quoteElement.innerHTML = `"Drop everything now, meet me in the pouraing rain"`;
} else if (iconData === "11d" || iconData === "11n") {quoteElement.innerHTML = `"If hugs were lightning, I would send you a thunderstorm"`;
} else if (iconData === "13d" || iconData === "13n") {quoteElement.innerHTML = `"The first snow is like the first love"`;
} else {  quoteElement.innerHTML = `"You don't need sun, all you need is love"`;
    }
      }

   function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
  
    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
      <div class="col-2">
        <h3>
          ${formatHours(forecast.dt * 1000)}
        </h3>
        <img
          src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"
        />
        <div class="weather-forecast-temperature">
          <strong>
            ${Math.round(forecast.main.temp_max)}°
          </strong>
          ${Math.round(forecast.main.temp_min)}°
        </div>
      </div>
    `;
    }
  }

function Search (city) {

    let apiKey = "ab133fb9369951af7d1e6bff8e77458d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit (event) {
    event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
Search(cityInputElement.value);
//console.log(cityInputElement.value);
}

function showFahrenheitTemperature (event) {
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemperature * 9)/5 + 32;
let temperatureElement = document.querySelector("#temperature");
celciusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}


let celciusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-temp");
celciusLink.addEventListener("click", showCelciusTemperature);
Search("Zürich");