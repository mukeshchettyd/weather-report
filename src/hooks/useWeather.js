import { useState, useEffect } from 'react';
import {
    fetchWeatherByCity,
    fetchForecastByCity,
    fetchWeatherByCoords,
    fetchForecastByCoords
} from '../api/weatherService';

const HISTORY_KEY = 'weather_search_history';
const LAST_CITY_KEY = 'last_searched_city';

export const useWeather = () => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        setHistory(savedHistory);

        const lastCity = localStorage.getItem(LAST_CITY_KEY);
        if (lastCity) {
            searchByCity(lastCity);
        } else {
            getCurrentLocation();
        }
    }, []);

    const updateHistory = (city) => {
        setHistory((prev) => {
            const filtered = prev.filter((item) => item.toLowerCase() !== city.toLowerCase());
            const newHistory = [city, ...filtered].slice(0, 5);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
        localStorage.setItem(LAST_CITY_KEY, city);
    };

    const searchByCity = async (city) => {
        if (!city) return;
        setLoading(true);
        setError(null);
        try {
            const weatherData = await fetchWeatherByCity(city);
            const forecastData = await fetchForecastByCity(city);
            setWeather(weatherData);
            setForecast(forecastData);
            updateHistory(weatherData.name);
        } catch (err) {
            setError(err.message || err.response?.data?.message || 'City not found. Please try again.');
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const weatherData = await fetchWeatherByCoords(latitude, longitude);
                    const forecastData = await fetchForecastByCoords(latitude, longitude);
                    setWeather(weatherData);
                    setForecast(forecastData);
                    updateHistory(weatherData.name);
                } catch (err) {
                    const msg = err.response?.data?.message || 'Failed to fetch weather for your location.';
                    setError(msg.charAt(0).toUpperCase() + msg.slice(1));
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
                setError('Location access denied. Search for a city instead.');
            }
        );
    };

    const refreshWeather = () => {
        if (weather) {
            searchByCity(weather.name);
        }
    };

    return {
        weather,
        forecast,
        history,
        loading,
        error,
        searchByCity,
        getCurrentLocation,
        refreshWeather,
    };
};
