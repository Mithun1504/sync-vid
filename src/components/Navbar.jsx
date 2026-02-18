import React from 'react';
import logo from '/assets/images/logo.png'; // Updated path based on user info

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Sync Logo" width={150} height={150} />
            </div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#individuals">Individuals</a></li>
                <li><a href="#professionals">Professionals</a></li>
                <li><a href="#library">Library</a></li>
                <li><button className="nav-cta">Book Now</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
