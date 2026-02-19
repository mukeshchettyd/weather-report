import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, RefreshCw } from 'lucide-react';
import './Search.css';

const Search = ({ onSearch, onGetLocation, onRefresh }) => {
    const [city, setCity] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const POPULAR_CITIES = ['London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Mumbai'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
            setShowSuggestions(false);
        }
    };

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <form onSubmit={handleSubmit} className="search-form glass">
                    <SearchIcon size={20} color="var(--secondary-text)" />
                    <input
                        type="text"
                        placeholder="Search for a city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>

                {showSuggestions && (
                    <div className="suggestions-list glass fade-in">
                        {POPULAR_CITIES.map((name) => (
                            <button
                                key={name}
                                className="suggestion-item"
                                onClick={() => {
                                    onSearch(name);
                                    setCity('');
                                    setShowSuggestions(false);
                                }}
                            >
                                <SearchIcon size={14} />
                                {name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="search-actions">
                <button onClick={onGetLocation} className="glass action-button" title="Use current location">
                    <MapPin size={20} />
                </button>
                <button onClick={onRefresh} className="glass action-button" title="Refresh weather">
                    <RefreshCw size={20} />
                </button>
            </div>
        </div>
    );
};

export default Search;
