import React from "react";
import logo from "/assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="Sync Logo" className="footer-logo" />
          <p className="footer-tagline">
            Bridging psychological depth and spiritual expansion.
          </p>
        </div>

        <div className="footer-links-container">
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">Problem</a>
              </li>
              <li>
                <a href="#individuals">Your Approach</a>
              </li>
              <li>
                <a href="#offerings">Offerings</a>
              </li>
              <li>
                <a href="#outcomes">Outcomes</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#philosophy">Philosophy</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="#contact">Book Now</a>
              </li>
              <li>
                <a href="#instagram">Instagram</a>
              </li>
              <li>
                <a href="#linkedin">LinkedIn</a>
              </li>
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
