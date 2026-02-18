import React from 'react';
import Search from './components/Search/Search';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Forecast from './components/Forecast/Forecast';
import History from './components/History/History';
import Loader from './components/UI/Loader';
import Error from './components/UI/Error';
import DarkModeToggle from './components/UI/DarkModeToggle';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const {
    weather,
    forecast,
    history,
    loading,
    error,
    searchByCity,
    getCurrentLocation,
    refreshWeather
  } = useWeather();

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <div className="logo">
            <span className="logo-icon">☁️</span>
            <h1>SkyCast</h1>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <main className="container">
        <Search
          onSearch={searchByCity}
          onGetLocation={getCurrentLocation}
          onRefresh={refreshWeather}
        />

        <History history={history} onSelect={searchByCity} />

        {loading && <Loader />}

        {error && <Error message={error} />}

        {!loading && !error && weather && (
          <div className="weather-content">
            <WeatherCard weather={weather} />
            <Forecast forecast={forecast} />
          </div>
        )}

        {!loading && !weather && !error && (
          <div className="welcome-state fade-in">
            <h2>Welcome to SkyCast</h2>
            <p>Search for a city or use your location to get started.</p>
          </div>
        )}
      </main>

      <footer className="container app-footer">
        <p>© {new Date().getFullYear()} SkyCast Weather. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;
