import React from 'react';
import { getIconUrl } from '../../api/weatherService';
import './Forecast.css';

const Forecast = ({ forecast }) => {
    if (!forecast) return null;

    // Filter for one reading per day (around noon)
    const dailyForecast = forecast.list.filter((reading) => reading.dt_txt.includes('12:00:00'));

    return (
        <div className="forecast-container">
            <h2 className="section-title">5-Day Forecast</h2>
            <div className="forecast-grid">
                {dailyForecast.map((day) => (
                    <div key={day.dt} className="forecast-item glass fade-in">
                        <p className="forecast-day">
                            {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <img
                            src={getIconUrl(day.weather[0].icon)}
                            alt={day.weather[0].description}
                            className="forecast-icon"
                        />
                        <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
                        <p className="forecast-condition">{day.weather[0].main}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
