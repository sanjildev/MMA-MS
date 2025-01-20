import React from 'react';
import { FaFacebook, FaInstagram,FaTiktok , FaYoutube } from 'react-icons/fa';
import '../styles/AboutUs.css';
import logo from '/images/octa.png'
const AboutUs = () => {
  return (
    <div className="about-us-section">
      {/* Header Section */}
      <div className="about-us-header">
        <h1>About Us</h1>
        <p>Your Gateway to MMA News and Fighter Profiles</p>
      </div>

      {/* Content Section */}
      <div className="about-us-content">
        <p>
          Welcome to <strong>Octaverse MMA Nepal</strong>, your trusted source for the latest MMA news and detailed fighter profiles. 
          We are passionate about bringing you accurate and up-to-date information from the world of Mixed Martial Arts.
          From breaking news to in-depth fighter stats, we are here to keep you informed and inspired. 
          Dive into the stories of your favorite fighters and stay updated with all things MMA.
        </p>
      </div>

      {/* Visuals Section */}
      <div className="about-us-visuals">
        <img src={logo} alt="Octaverse MMA Action" />
      </div>

      {/* Call to Action */}
      <div className="about-us-cta">
        <h2>Connect with Us</h2>
        <p>Follow us on social media to stay updated with the latest MMA news and fighter profiles.</p>
        <div className="social-media-links">
          <a href="https://www.facebook.com/octaversemmanepal" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook size={30} />
          </a>
          <a href="https://www.instagram.com/octaversemmanepal/?hl=en" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.tiktok.com/@octaversemmanepal" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTiktok size={30} />
          </a>
          <a href="https://www.youtube.com/@ovmshorts5933/shorts" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaYoutube size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;