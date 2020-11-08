function formatDate() {
    let now = new Date();
    let date = now.getDate();
    let hours = now.getHours();
    if (hours < 10) {
  hours = `0${hours}`;
    }
    let minutes = now.getMinutes ();
    if (minutes < 10) {
  
  minutes = `0${minutes}`;
  
    }
    let year = now.getFullYear();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    let day = days[now.getDay()];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let month = months[now.getMonth()];
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = `${day}, ${date} ${hours}:${minutes}`;
  }
  
  formatDate();

function displayTemperature (response) {
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
    // console.log(response.data);
}

function Search (city) {

    let apiKey = "ab133fb9369951af7d1e6bff8e77458d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit (event) {
    event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
Search(cityInputElement.value);
//console.log(cityInputElement.value);
}

Search("Zürich");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
