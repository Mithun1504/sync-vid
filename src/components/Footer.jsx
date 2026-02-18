import React from 'react';
import logo from '/assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <img src={logo} alt="Sync Logo" className="footer-logo" />
                    <p className="footer-tagline">Bridging psychological depth and spiritual expansion.</p>
                </div>

                <div className="footer-links-container">
                    <div className="footer-column">
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#about">About</a></li>
                            <li><a href="#individuals">Individuals</a></li>
                            <li><a href="#professionals">Professionals</a></li>
                            <li><a href="#library">Library</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#instagram">Instagram</a></li>
                            <li><a href="#linkedin">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h4>Stay Aligned</h4>
                    <p>Join our newsletter for weekly insights.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Sync. All rights reserved.</p>
                <div className="footer-legal">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
