document.addEventListener('DOMContentLoaded', () => {

    const temperature = 12;
    const windSpeed = 5;
    const conditions = "Partly Cloudy";

    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById('windChill').textContent = windChill;
    document.getElementById('currentTemp').textContent = temperature;
    document.getElementById('WindSpeed').textContent = windSpeed;
    document.getElementById('Conditions').textContent = conditions;
});

function calculateWindChill(temp, speed) {
    if (temp <= 10 && speed > 4.8) {
        return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(2) + ' °C';
    } else {
        return 'N/A';
    }
}

