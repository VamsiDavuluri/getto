// src/Sidebar.js

import React from 'react';
import './Sidebar.css';
import { GoHome, GoGraph, GoPackage, GoCreditCard, GoPerson } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <h2 className="company-name">Getto</h2>
                <nav>
                    <ul className="nav-list">
                        <li><button type="button" className="nav-item"><GoHome size={24} /> Dashboard</button></li>
                        <li><button type="button" className="nav-item"><GoGraph size={24} /> Inventory</button></li>
                        <li><button type="button" className="nav-item"><GoPackage size={24} /> Orders</button></li>
                        <li><button type="button" className="nav-item"><GoCreditCard size={24} /> Payments</button></li>
                        <li><button type="button" className="nav-item"><GoPerson size={24} /> Getto Helpline</button></li>
                    </ul>
                </nav>
            </div>
            <div className="profile-section">
                <img src="http://googleusercontent.com/file_content/0" alt="User Avatar" className="profile-avatar" />
                <div className="profile-info">
                    <span className="profile-name">Vamsi</span>
                    <span className="profile-email">vamsidavuluri6...</span>
                </div>
                <IoIosArrowForward className="profile-arrow" />
            </div>
        </aside>
    );
};

export default Sidebar;
