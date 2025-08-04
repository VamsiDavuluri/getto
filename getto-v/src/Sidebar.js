// src/Sidebar.js

import React from 'react';
import './Sidebar.css';
import { GoHome, GoPackage, GoCreditCard, GoPerson,  GoSignOut } from 'react-icons/go';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

// It now accepts an onLogout function as a prop
const Sidebar = ({ onLogout }) => {
    const [isUserManagementOpen, setIsUserManagementOpen] = React.useState(false);

    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <h2 className="company-name"><img src="logo.svg" alt="" /></h2>
                <nav>
                    <ul className="nav-list">
                        <li><button type="button" className="nav-item"><GoHome size={24} /> Dashboard</button></li>
                        {/* Other nav items... */}
                        <li><button type="button" className="nav-item active"><GoPerson size={24} /> Vendors</button></li>
                        <li><button type="button" className="nav-item"><GoPackage size={24} /> Orders</button></li>
                        <li><button type="button" className="nav-item"><GoCreditCard size={24} /> Payments</button></li>
                        <li><button type="button" className="nav-item"><GoPerson size={24} /> Getto Helpline</button></li>
                        <li className="user-management">
                            <button type="button" className="nav-item" onClick={() => setIsUserManagementOpen(!isUserManagementOpen)}>
                                <GoPerson size={24} /> 
                                <span>User Management</span>
                                {isUserManagementOpen ? <IoIosArrowDown className="profile-arrow" /> : <IoIosArrowForward className="profile-arrow" />}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* The profile section now contains a clickable logout button */}
            <div className="profile-section">

                {/* THIS IS THE LOGOUT BUTTON */}
                <button onClick={onLogout} className="logout-btn" title="Log Out">
                    <GoSignOut className="profile-arrow" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;