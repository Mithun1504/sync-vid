import React from "react";
import logo from "/assets/images/logo.png"; // Updated path based on user info

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "Problem" },
    { id: "individuals", label: "Your Approach" },
    { id: "offerings", label: "Offerings" },
    { id: "outcomes", label: "Outcomes" },
    { id: "testimonials", label: "Testimonials" },
    { id: "philosophy", label: "Philosophy" },
  ];

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

  const renderLinks = (className) =>
    navLinks.map(({ id, label }) => (
      <li key={id} className={className}>
        <a href={`#${id}`} onClick={(e) => handleLinkClick(e, id)}>
          {label}
        </a>
      </li>
    ));

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`} aria-label="Primary">
      <div className="navbar-container">
        <a
          className="navbar-logo"
          href="#home"
          onClick={(e) => handleLinkClick(e, "home")}
        >
          <img src={logo} alt="Sync Logo" />
        </a>

        <ul className="navbar-links navbar-links-desktop">
          {renderLinks("navbar-link-item")}
        </ul>

        <div className="navbar-actions">
          <a
            className="nav-cta nav-cta-desktop"
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
          >
            Book a Session
          </a>

          <button
            type="button"
            className="menu-icon"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <div className={isOpen ? "bar open" : "bar"}></div>
            <div className={isOpen ? "bar open" : "bar"}></div>
            <div className={isOpen ? "bar open" : "bar"}></div>
          </button>
        </div>
      </div>

      <div className={`navbar-mobile-panel ${isOpen ? "active" : ""}`}>
        <ul className="navbar-links navbar-links-mobile">
          {renderLinks("navbar-link-item-mobile")}
        </ul>

        <a
          className="nav-cta nav-cta-mobile"
          href="#contact"
          onClick={(e) => handleLinkClick(e, "contact")}
        >
          Book a Session
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
