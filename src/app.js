function formatDate(timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`
}
    let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`
}
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "alt", response.data.weather[0].description);
    iconElement.setAttribute(
        "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
let apiKey = "3a5b83d2290ca8aeea736a82a10e7ea7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayImperialMetric(event) {
    event.preventDefault();
    celsiuslLink.classList.remove("active");
    imperialLink.classList.add("active");
    let imperialMetric = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(imperialMetric);

}

function displaycelsiusTemperature(event) {
    event.preventDefault();
    celsiuslLink.classList.add("active");
    imperialLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let imperialLink = document.querySelector("#imperial-link");
imperialLink.addEventListener("click", displayImperialMetric);

let celsiuslLink = document.querySelector("#celsius-link");
celsiuslLink.addEventListener("click", displaycelsiusTemperature);

search("Sao Paulo");