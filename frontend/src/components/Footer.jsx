import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css'; // Import the CSS file for styling
import { FaInstagram,FaFacebookF,FaYoutube } from "react-icons/fa";
import logo from '/images/octa.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <NavLink to='/'><img src={logo} alt="" srcset="" /></NavLink>
        </div>
        <div className="footer-links">
          <ul>
            <li><NavLink to="/" activeClassName="active-link">Home</NavLink></li>
            <li><NavLink to="/news" activeClassName="active-link">News</NavLink></li>
            <li><NavLink to="/fighters" activeClassName="active-link">Fighter Profiles</NavLink></li>
            <li><NavLink to="/events" activeClassName="active-link">Events</NavLink></li>
            <li><NavLink to="/contact" activeClassName="active-link">Contact</NavLink></li>
          </ul>
        </div>
        <div className="footer-social">
          <ul>
            <li><a href="https://www.instagram.com/octaversemmanepal/?hl=en" target='_blank'><FaInstagram /></a></li>
            <li><a href="https://www.facebook.com/octaversemmanepal" target='_blank'><FaFacebookF/></a></li>
            <li><a href="https://www.youtube.com/@ovmshorts5933/shorts" target='_blank'><FaYoutube/></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Octaverse MMA Nepal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
