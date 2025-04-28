// Updated API URL to use HTTPS and environment variable for the API key
const APIURL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY}`;
const searchBox = document.querySelector(".searchBox input");
const searchBtn = document.querySelector(".searchBox button");
const WeatherImg = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");
const weather = document.querySelector(".weather-description");

async function GetWeatherData(place) {
    try {
        // Fetch weather data from OpenWeatherMap API
        let response = await fetch(`${APIURL}&q=${place}`);
        if (!response.ok) {
            // Handle case where the city is not found
            errorMessage.style.display = "block";
            weather.style.display = "none";
            return;
        }

        let data = await response.json();
        console.log(data);

        // Update city name
        let city = document.querySelector(".city");
        city.innerHTML = data.name;

        // Convert temperature from Kelvin to Celsius and update it
        let temp = document.querySelector(".temperature");
        temp.innerHTML = Math.round(data.main.temp - 273.15) + " &deg;C";

        // Update humidity
        let humidity = document.querySelector(".humidity");
        humidity.innerHTML = data.main.humidity + " %";

        // Update wind speed
        let wind = document.querySelector(".wind");
        wind.innerHTML = data.wind.speed + " km/h";

        // Use a mapping for weather icons to simplify the code
        const weatherIcons = {
            Clouds: "./Images/clouds.png",
            Clear: "./Images/clear.png",
            Rain: "./Images/rain.png",
            Snow: "./Images/snow.png",
            Drizzle: "./Images/drizzle.png",
            Mist: "./Images/mist.png",
        };

        // Set weather icon or fallback to default icon
        WeatherImg.src = weatherIcons[data.weather[0].main] || "./Images/default.png";

        // Display weather details and hide the error message
        weather.style.display = "block";
        errorMessage.style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle network or unexpected errors
        errorMessage.style.display = "block";
        weather.style.display = "none";
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const place = searchBox.value.trim(); // Trim whitespace from user input
    if (place) {
        GetWeatherData(place);
    } else {
        alert("Please enter a city name!");
    }
});
