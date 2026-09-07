# Weather Dashboard

A beautiful, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

- 🌍 **Real-time Weather Data** - Get current weather for any city worldwide
- 📊 **5-Day Forecast** - View weather predictions for the next 5 days
- 💾 **Search History** - Recently searched cities are saved locally
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📈 **Detailed Metrics** - Temperature, humidity, wind speed, pressure, visibility, and more
- 🌦️ **Weather Icons** - Visual weather condition indicators with emojis

## Weather Information Displayed

### Current Weather
- Temperature (°C)
- "Feels like" temperature
- Weather description
- Humidity (%)
- Wind speed (m/s)
- Atmospheric pressure (hPa)
- Cloud coverage (%)
- Visibility (km)

### 5-Day Forecast
- Daily high/low temperatures
- Weather conditions
- Visual weather icons

## How to Use

1. **Open the application** - Simply open `index.html` in your web browser
2. **Search for a city** - Type a city name and press Enter or click the search button
3. **View weather data** - Current conditions and 5-day forecast display automatically
4. **Quick access** - Click on recent searches to quickly view weather for previously searched cities

## API Used

- **OpenWeatherMap API** (Free tier)
  - Current weather endpoint
  - 5-day forecast endpoint
  - No authentication required (public API key included)

## Technical Stack

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with gradients, flexbox, and grid layout
- **Vanilla JavaScript** - API calls and DOM manipulation
- **LocalStorage** - Persistent search history
- **Font Awesome** - Search icon

## Project Structure

```
weather-dashboard/
├── index.html       # Main HTML file
├── style.css        # Styling
├── script.js        # Game logic and API integration
└── README.md        # Documentation
```

## Features Explanation

### Search Functionality
- Enter any city name to get weather data
- Case-insensitive search
- Error handling for invalid cities
- Enter key support for quick search

### Search History
- Automatically saves up to 10 recent searches
- Stored in browser's LocalStorage
- Click any previous search to quickly reload weather
- Persists across browser sessions

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly buttons and input fields
- Optimized for all screen sizes

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Eoin756/weather-dashboard.git
cd weather-dashboard
```

2. Open in browser:
```bash
open index.html
# or simply double-click index.html
```

No installation or build process required!

## API Details

The application uses the free tier of OpenWeatherMap API. A public API key is included for demo purposes.

**For production use:**
1. Get your own API key from [openweathermap.org](https://openweathermap.org/api)
2. Replace the `API_KEY` variable in `script.js`
3. Consider using environment variables to hide the API key

## Future Enhancements

- [ ] Geolocation auto-detection
- [ ] Multiple city comparison
- [ ] Weather alerts
- [ ] Historical weather data
- [ ] Dark/Light theme toggle
- [ ] Air quality index (AQI)
- [ ] Pollen count information
- [ ] Weather radar integration
- [ ] Hourly forecast view

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or suggestions, please create an issue on GitHub.

Enjoy the weather dashboard! ☀️🌧️
