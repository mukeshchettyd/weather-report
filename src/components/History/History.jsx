import React from 'react';
import { History as HistoryIcon, X } from 'lucide-react';
import './History.css';

const History = ({ history, onSelect }) => {
    if (!history || history.length === 0) return null;

    return (
        <div className="history-container fade-in">
            <div className="history-header">
                <HistoryIcon size={18} />
                <span>Recent Searches</span>
            </div>
            <div className="history-list">
                {history.map((city, index) => (
                    <button
                        key={`${city}-${index}`}
                        className="history-item glass"
                        onClick={() => onSelect(city)}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default History;
