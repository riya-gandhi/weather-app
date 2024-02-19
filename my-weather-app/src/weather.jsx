import React, { useState } from 'react';

const API_KEY = '9e59cf56abda58ec6aa05ac62ad95160';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (response.ok) {
                const data = await response.json();
                setWeatherData(data);
                setError(null);
            } else {
                setError('City not found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data. Please try again later.');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className="weather-app">
            <h1>Weather Forecast</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
