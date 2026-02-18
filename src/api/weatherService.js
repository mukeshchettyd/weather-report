import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await apiClient.get('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchForecastByCity = async (city) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await apiClient.get('/weather', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchForecastByCoords = async (lat, lon) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
