// OpenWeatherMap API key - Using free tier API
// Note: For production, use environment variables
const API_KEY = 'b6fd43953d13d6fefad868f52900a76f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecastContainer');
const searchHistoryDiv = document.getElementById('searchHistory');

let searchHistory = localStorage.getItem('searchHistory')
    ? JSON.parse(localStorage.getItem('searchHistory'))
    : [];

// Event listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});

// Load weather on page load (default city)
window.addEventListener('load', () => {
    if (searchHistory.length > 0) {
        getWeather(searchHistory[0]);
    } else {
        getWeather('London');
    }
    displaySearchHistory();
});

function searchWeather() {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
        addToSearchHistory(city);
        cityInput.value = '';
    }
}

function getWeather(city) {
    currentWeatherDiv.innerHTML = '<div class="loading">Loading...</div>';
    forecastDiv.innerHTML = '<div class="loading">Loading forecast...</div>';

    // Current weather
    fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            displayCurrentWeather(data);
            // Get forecast using coordinates
            getForecast(data.coord.lat, data.coord.lon);
        })
        .catch((error) => {
            currentWeatherDiv.innerHTML = `<div class="error">❌ ${error.message}. Please try again.</div>`;
            forecastDiv.innerHTML = '';
        });
}

function displayCurrentWeather(data) {
    const { main, weather, wind, sys, name, clouds } = data;
    const icon = getWeatherIcon(weather[0].main);

    const html = `
        <div class="weather-main">
            <h2 class="city-name">${name}, ${sys.country}</h2>
            <div class="temperature">${Math.round(main.temp)}°C</div>
            <p class="weather-description">${weather[0].description.toUpperCase()}</p>
            <p class="feels-like">Feels like ${Math.round(main.feels_like)}°C</p>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <div class="detail-label">💧 Humidity</div>
                <div class="detail-value">${main.humidity}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">🌪️ Wind Speed</div>
                <div class="detail-value">${wind.speed} m/s</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">🔍 Pressure</div>
                <div class="detail-value">${main.pressure} hPa</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">☁️ Cloudiness</div>
                <div class="detail-value">${clouds.all}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">👁️ Visibility</div>
                <div class="detail-value">${(data.visibility / 1000).toFixed(1)} km</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">📊 UV Index</div>
                <div class="detail-value">${icon}</div>
            </div>
        </div>
    `;
    currentWeatherDiv.innerHTML = html;
}

function getForecast(lat, lon) {
    fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            displayForecast(data.list);
        })
        .catch((error) => {
            console.error('Forecast error:', error);
            forecastDiv.innerHTML =
                '<div class="error">Could not load forecast</div>';
        });
}

function displayForecast(forecastList) {
    // Get one forecast per day (every 8th item is roughly 24 hours later)
    const dailyForecasts = forecastList.filter((item, index) => index % 8 === 0);

    const html = dailyForecasts
        .map((item) => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(item.main.temp);
            const icon = getWeatherIcon(item.weather[0].main);
            const description = item.weather[0].main;

            return `
                <div class="forecast-card">
                    <div class="forecast-day">${day}</div>
                    <div class="forecast-icon">${icon}</div>
                    <div class="forecast-temp">${temp}°C</div>
                    <div class="forecast-desc">${description}</div>
                </div>
            `;
        })
        .join('');

    forecastDiv.innerHTML = html;
}

function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🏜️',
        'Ash': '🌋',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    return icons[weatherMain] || '🌤️';
}

function addToSearchHistory(city) {
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    // Remove if already exists
    searchHistory = searchHistory.filter(
        (c) => c.toLowerCase() !== formattedCity.toLowerCase()
    );
    // Add to beginning
    searchHistory.unshift(formattedCity);
    // Keep only 10 recent searches
    searchHistory = searchHistory.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function displaySearchHistory() {
    const html = searchHistory
        .map(
            (city) => `
                <button class="history-btn" onclick="getWeather('${city}')">
                    ${city}
                </button>
            `
        )
        .join('');
    searchHistoryDiv.innerHTML = html || '<p style="color: #999;">No recent searches</p>';
}
