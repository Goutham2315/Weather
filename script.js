
const APIURL = "http://api.openweathermap.org/data/2.5/weather?&appid=e51eaef3a076a3e502e432d022ba3702";
const searchBox = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".searchBox button");
const WeatherImg = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");
const weather = document.querySelector(".weather-description");
async function GetWeatherData(place) {

    let response = await fetch(APIURL + "&q=" + place);

    if (response.status === 404) {
        errorMessage.style.display = "block";
        weather.style.display = "none";
    }
    else {
        let data = await response.json();
        console.log(data);
        let city = document.querySelector(".city");
        city.innerHTML = data.name;
        let temp = document.querySelector(".temperature");
        temp.innerHTML = Math.round(data.main.temp) + " &deg C";
        let humidity = document.querySelector(".humidity");
        humidity.innerHTML = data.main.humidity + " %";
        let wind = document.querySelector(".wind");
        wind.innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            WeatherImg.src = "./Images/clouds.png";
        }
        else if (data.weather[0].main === "Clear") {
            WeatherImg.src = "./Images/clear.png";
        }
        else if (data.weather[0].main === "Rain") {
            WeatherImg.src = "./Images/rain.png";
        }
        else if (data.weather[0].main === "Snow") {
            WeatherImg.src = "./Images/snow.png";
        }
        else if (data.weather[0].main === "Drizzle") {
            WeatherImg.src = "./Images/drizzle.png";
        }
        else if (data.weather[0].main === "Mist") {
            WeatherImg.src = '/Images/mist.png';
        }
        weather.style.display = "block";
        errorMessage.style.display = "none";
    }
}
searchBtn.addEventListener("click", () => {
    GetWeatherData(searchBox.value);
});
