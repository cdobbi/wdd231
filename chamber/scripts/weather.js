document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "0e3bf198c5b0b59b5e8d6558b2ca84c0";
    const city = "Accra"; // Change to desired city in Ghana
    const units = "metric"; // "metric" for Celsius, "imperial" for Fahrenheit
  
    // Fetch Current Weather Data
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},GH&appid=${apiKey}&units=${units}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const temperature = data.main.temp;
        const windSpeed = data.wind.speed;
        const condition = data.weather[0].description;
      
        const windChill = calculateWindChill(temperature, windSpeed);
      
        // Update HTML Elements with Checks
        const currentTempEl = document.getElementById("currentTemp");
        const windSpeedEl = document.getElementById("windSpeed");
        const windChillEl = document.getElementById("windChill");
        const conditionEl = document.getElementById("condition");
      
        if (currentTempEl && windSpeedEl && windChillEl && conditionEl) {
          currentTempEl.textContent = temperature;
          windSpeedEl.textContent = windSpeed;
          windChillEl.textContent = windChill;
          conditionEl.textContent = capitalizeFirstLetter(condition);
        } else {
          console.error("One or more DOM elements are missing.");
        }
        // Update Weather Icon (Optional)
        const weatherIcon = data.weather[0].icon;
        const weatherIconEl = document.querySelector(".weather-icon");
        if (weatherIconEl) {
          weatherIconEl.textContent = getWeatherEmoji(weatherIcon);
        } else {
          console.error("Weather icon element is missing.");
        }
      })
      .catch((error) => {
        console.error("Error fetching current weather data:", error);
      });
  
    // Fetch Forecast Data
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},GH&appid=${apiKey}&units=${units}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // Process Forecast Data (e.g., daily summaries)
        const forecast = processForecastData(data.list);
  
        // Example: Update for specific dates
        const forecastElements = document.querySelectorAll(".forecast p");
  
        forecastElements.forEach((element) => {
          const spanEl = element.querySelector("span");
          const forecastTempEl = element.querySelector("#forecastTemp");
          if (spanEl && forecastTempEl) {
            const day = spanEl.textContent.replace(":", "");
            if (forecast[day]) {
              forecastTempEl.textContent = forecast[day].temp;
            }
          } else {
            console.error("Forecast elements are missing.");
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
});
  
// Function to Calculate Wind Chill
function calculateWindChill(temp, speed) {
  if (temp <= 10 && speed > 4.8) {
    return (
      (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(speed, 0.16) +
        0.3965 * temp * Math.pow(speed, 0.16)
      ).toFixed(2) + " °C"
    );
  } else {
    return "N/A";
  }
}
  
// Utility Function to Capitalize First Letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  
// Function to Get Weather Emoji Based on Icon Code
function getWeatherEmoji(iconCode) {
  const codeMap = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "🌥️",
    "04n": "🌥️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌦️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return codeMap[iconCode] || "🌈";
}
  
// Function to Process Forecast Data
function processForecastData(list) {
  const dailyData = {};
  
  list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
    if (!dailyData[day]) {
      dailyData[day] = {
        temp: entry.main.temp,
        weather: entry.weather[0].description,
      };
    }
  });
  
  return dailyData;
}