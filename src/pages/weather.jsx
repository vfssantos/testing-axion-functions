// pages/home.jsx
import React, { useEffect, useState, useCallback } from "npm:react";
import { debounce } from "../utility/debounce.js"; // Import the debounce function

const HomePage = () => {
    const [city, setCity] = useState("London");
    const [weather, setWeather] = useState(null);

    const fetchWeather = async (cityName) => {
        try {
            const response = await fetch(`/api/weather?city=${cityName}`);
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const debouncedFetchWeather = useCallback(debounce(fetchWeather, 500), []); // 500ms debounce

    useEffect(() => {
        debouncedFetchWeather(city);
    }, [city, debouncedFetchWeather]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Weather Dashboard</h1>
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city name"
                className="input input-bordered w-full mt-4"
            />
            {weather && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">{weather.city}</h2>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Weather Code: {weather.weather_state}</p>
                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
