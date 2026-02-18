import React from 'react';
import logo from '/assets/images/logo.png'; // Updated path based on user info

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="Sync Logo" />
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={isOpen ? 'bar open' : 'bar'}></div>
                    <div className={isOpen ? 'bar open' : 'bar'}></div>
                    <div className={isOpen ? 'bar open' : 'bar'}></div>
                </div>

                <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
                    <li><a href="#individuals" onClick={() => setIsOpen(false)}>Individuals</a></li>
                    <li><a href="#professionals" onClick={() => setIsOpen(false)}>Professionals</a></li>
                    <li><a href="#library" onClick={() => setIsOpen(false)}>Library</a></li>
                    <li><button className="nav-cta">Book Now</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
