// src/StoreTimings.js

import React from 'react';
import './StoreTimings.css';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const StoreTimings = ({ timings, handleToggle, handleTimeChange, handleApplyToAll }) => {
    return (
        <div className="timings-container">
            <div className="timings-header">
                <h3>Store Timings</h3>
                <button type="button" onClick={handleApplyToAll} className="apply-all-btn">Apply Monday's time to all</button>
            </div>
            <div className="timings-form">
                {daysOfWeek.map(day => (
                    timings[day] && (
                        <div key={day} className={`day-row ${timings[day].isOpen ? 'open' : 'closed'}`}>
                            <div className="day-toggle-wrapper">
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={timings[day].isOpen}
                                        onChange={() => handleToggle(day)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <span className="day-label">{capitalize(day)}</span>
                            </div>
                            {timings[day].isOpen && (
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
                    )
                ))}
            </div>
        </div>
    );
};

export default StoreTimings;
