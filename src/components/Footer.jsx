import React from 'react';
import logo from '/assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <img src={logo} alt="Sync Logo" className="footer-logo" />
                    <p>Bridging psychological depth and spiritual expansion.</p>
                </div>
                <div className="footer-links">
                    <div>
                        <h4>Explore</h4>
                        <ul>
                            <li>About</li>
                            <li>Individuals</li>
                            <li>Professionals</li>
                            <li>Library</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Connect</h4>
                        <ul>
                            <li>Contact</li>
                            <li>Instagram</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-newsletter">
                    <h4>Stay Aligned</h4>
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2026 Sync. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
