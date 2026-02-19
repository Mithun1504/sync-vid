import React from 'react';
import logo from '/assets/images/logo.png'; // Updated path based on user info

const Navbar = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        if (onNavigate) {
            onNavigate(id);
        }
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
                    <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
                    <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About</a></li>
                    <li><a href="#individuals" onClick={(e) => handleLinkClick(e, 'individuals')}>Individuals</a></li>
                    <li><a href="#professionals" onClick={(e) => handleLinkClick(e, 'professionals')}>Professionals</a></li>
                    <li><a href="#library" onClick={(e) => handleLinkClick(e, 'library')}>Library</a></li>
                    <li><button className="nav-cta"><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Book Now</a></button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
