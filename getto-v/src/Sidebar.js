// src/Sidebar.js

import React from 'react';
import './Sidebar.css';
import { GoHome, GoPackage, GoPerson, GoGraph, GoSignOut } from 'react-icons/go'; // Simplified imports for clarity

// The component now accepts the onLogout function as a prop
const Sidebar = ({ onLogout }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <h2 className="company-name">Getto</h2>
                <nav>
                    <ul className="nav-list">
                        <li><button type="button" className="nav-item"><GoHome size={24} /> Dashboard</button></li>
                        <li><button type="button" className="nav-item"><GoGraph size={24} /> Inventory</button></li>
                        {/* The 'active' class should be managed by a router in a larger app, but is static here for simplicity */}
                        <li><button type="button" className="nav-item active"><GoPerson size={24} /> Vendors</button></li>
                        <li><button type="button" className="nav-item"><GoPackage size={24} /> Orders</button></li>
                        <li><button type="button" className="nav-item"><GoPerson size={24} /> Getto Helpline</button></li>
                    </ul>
                </nav>
            </div>
            <div className="profile-section">
                
                {/* The onClick event is now wired to the onLogout function */}
                <button onClick={onLogout} className="logout-btn" title="Log Out">
                    <GoSignOut className="profile-arrow" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;