import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, RefreshCw } from 'lucide-react';
import './Search.css';

const Search = ({ onSearch, onGetLocation, onRefresh }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form glass">
                <SearchIcon size={20} color="var(--secondary-text)" />
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>

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
