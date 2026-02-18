import React from 'react';
import { AlertCircle } from 'lucide-react';

const Error = ({ message }) => (
    <div className="glass fade-in" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'var(--error)',
        margin: '1rem 0'
    }}>
        <AlertCircle color="var(--error)" size={24} />
        <p style={{ color: 'var(--text-color)', fontWeight: 500 }}>{message}</p>
    </div>
);

export default Error;
