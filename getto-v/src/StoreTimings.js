// src/StoreTimings.js
import React from 'react';
import './StoreTimings.css';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// The props { ..., handleApplyToAll } must be listed here to be used.
const StoreTimings = ({ timings, handleToggle, handleTimeChange, handleApplyToAll }) => {
    return (
        <div className="timings-container">
            <div className="form-section-header">
                <h2>Store Timings</h2>
                {/* The onClick must be set to the handleApplyToAll prop */}
                <button type="button" onClick={handleApplyToAll} className="apply-all-btn">
                    Apply Monday's time to all
                </button>
            </div>
            <div className="timings-form">
                {daysOfWeek.map(day => (
                    <div key={day} className={`day-row ${timings[day]?.isOpen ? 'open' : 'closed'}`}>
                        <div className="day-toggle-wrapper">
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={timings[day]?.isOpen || false}
                                    onChange={() => handleToggle(day)}
                                />
                                <span className="slider round"></span>
                            </label>
                            <span className="day-label">{capitalize(day)}</span>
                        </div>
                        {timings[day]?.isOpen && (
                            <div className="time-inputs-wrapper">
                                <input 
                                    type="time" 
                                    className="time-input"
                                    value={timings[day].from}
                                    onChange={(e) => handleTimeChange(day, 'from', e.target.value)}
                                />
                                <span className="time-separator">to</span>
                                <input 
                                    type="time" 
                                    className="time-input"
                                    value={timings[day].to}
                                    onChange={(e) => handleTimeChange(day, 'to', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreTimings;