function calculateWindChill(temp, speed) {
  return temp <= 10 && speed > 4.8
    ? (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(speed, 0.16) +
        0.3965 * temp * Math.pow(speed, 0.16)
      ).toFixed(2) + " °C"
    : "N/A";
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
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
function processForecastData(list) {
  const dailyData = {};
  return (
    list.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0],
        day = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
      dailyData[day] ||
        (dailyData[day] = {
          temp: entry.main.temp,
          weather: entry.weather[0].description,
        });
    }),
    dailyData
  );
}
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "0e3bf198c5b0b59b5e8d6558b2ca84c0",
    city = "Accra",
    units = "metric";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Accra,GH&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error("Network response was not ok " + response.statusText);
      return response.json();
    })
    .then((data) => {
      const temperature = data.main.temp,
        windSpeed = data.wind.speed,
        condition = data.weather[0].description,
        windChill = calculateWindChill(temperature, windSpeed);
      (document.getElementById("currentTemp").textContent = temperature),
        (document.getElementById("windSpeed").textContent = windSpeed),
        (document.getElementById("windChill").textContent = windChill),
        (document.getElementById("condition").textContent =
          capitalizeFirstLetter(condition));
      const weatherIcon = data.weather[0].icon;
      document.querySelector(".weather-icon").textContent =
        getWeatherEmoji(weatherIcon);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
    }),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Accra,GH&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Network response was not ok " + response.statusText);
        return response.json();
      })
      .then((data) => {
        const forecast = processForecastData(data.list),
          forecastElements = document.querySelectorAll(".forecast p");
        forecastElements.forEach((element) => {
          const day = element
            .querySelector("span")
            .textContent.replace(":", "");
          forecast[day] &&
            (element.querySelector("#forecastTemp").textContent =
              forecast[day].temp);
        });
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
});
