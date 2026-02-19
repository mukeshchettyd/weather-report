import React from 'react';
import { Droplets, Wind, Thermometer, Sunrise, Sunset, MapPin } from 'lucide-react';
import { getIconUrl } from '../../api/weatherService';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    const { name, main, wind, sys, weather: details } = weather;
    const condition = details[0];

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="weather-card glass fade-in">
            <div className="weather-header">
                <div className="location">
                    <MapPin size={24} color="var(--primary)" />
                    <h1>{name}, {sys.country}</h1>
                </div>
                <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>

            <div className="weather-main">
                <div className="temp-section">
                    <img src={getIconUrl(condition.icon)} alt={condition.description} className="weather-icon" />
                    <div className="temp-display">
                        <span className="current-temp">{Math.round(main.temp)}°C</span>
                        <span className="condition-text">{condition.description}</span>
                    </div>
                </div>

                <div className="stats-grid">
                    {main.temp_min !== main.temp && (
                        <div className="stat-item">
                            <Thermometer size={20} color="var(--primary)" />
                            <div>
                                <p className="stat-label">Min / Max</p>
                                <p className="stat-value">{Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°</p>
                            </div>
                        </div>
                    )}
                    <div className="stat-item">
                        <Droplets size={20} color="#3b82f6" />
                        <div>
                            <p className="stat-label">Humidity</p>
                            <p className="stat-value">{main.humidity}%</p>
                        </div>
                    </div>
                    <div className="stat-item">
                        <Wind size={20} color="#10b981" />
                        <div>
                            <p className="stat-label">Wind Speed</p>
                            <p className="stat-value">{wind.speed} {weather.isWeatherStack ? 'km/h' : 'm/s'}</p>
                        </div>
                    </div>
                    {sys.sunrise !== 0 && (
                        <div className="stat-item">
                            <Sunrise size={20} color="#f59e0b" />
                            <div>
                                <p className="stat-label">Sunrise</p>
                                <p className="stat-value">{formatTime(sys.sunrise)}</p>
                            </div>
                        </div>
                    )}
                    {sys.sunset !== 0 && (
                        <div className="stat-item">
                            <Sunset size={20} color="#f97316" />
                            <div>
                                <p className="stat-label">Sunset</p>
                                <p className="stat-value">{formatTime(sys.sunset)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
