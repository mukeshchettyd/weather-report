import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
});

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await apiClient.get('/current', {
      params: { query: city },
    });

    if (response.data.error) {
      throw new Error(response.data.error.info);
    }

    // Map WeatherStack to internal format
    return transformWeatherStackResponse(response.data);
  } catch (error) {
    throw error;
  }
};

export const fetchForecastByCity = async (city) => {
  // WeatherStack free tier does not support forecast. 
  // We'll return null or empty to avoid breaking the app.
  return null;
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await apiClient.get('/current', {
      params: { query: `${lat},${lon}` },
    });

    if (response.data.error) {
      throw new Error(response.data.error.info);
    }

    return transformWeatherStackResponse(response.data);
  } catch (error) {
    throw error;
  }
};

export const fetchForecastByCoords = async (lat, lon) => {
  return null;
};

// Internal mapper to keep components working with minimal changes
const transformWeatherStackResponse = (data) => {
  const { current, location } = data;
  return {
    name: location.name,
    main: {
      temp: current.temperature,
      temp_min: current.temperature, // WeatherStack free tier doesn't give min/max
      temp_max: current.temperature,
      humidity: current.humidity,
    },
    wind: {
      speed: current.wind_speed,
    },
    sys: {
      country: location.country,
      sunrise: 0, // Not provided in current weather standard response
      sunset: 0,
    },
    weather: [
      {
        icon: current.weather_icons[0],
        description: current.weather_descriptions[0],
      }
    ],
    isWeatherStack: true // Flag to handle icon differences
  };
};

export const getIconUrl = (icon) => icon; // WeatherStack gives full URLs
