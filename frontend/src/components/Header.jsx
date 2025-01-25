import React from 'react'
import '../styles/Header.css'
import logo from '/images/octa.png'
import {NavLink} from 'react-router-dom'
import { FaInstagram,FaFacebookF,FaYoutube } from "react-icons/fa";
const Header = () => {
  return (
    <>
        <div className="main">
            <div className="logo_nav"><div className="logo"><NavLink to='/'><img src={logo} alt="" srcset="" /></NavLink></div>
            <div className="navbar">
           <NavLink to='/'>Home</NavLink>
           <NavLink to='/news'>News</NavLink>
           <NavLink to='/fighters'>Fighters</NavLink>
           <NavLink to='/about-us'>About Us</NavLink>
           <NavLink to='/login'>Log In</NavLink>
            </div>
            </div>
            <div className="social_media">
              <a href="https://www.instagram.com/octaversemmanepal/?hl=en" target='_blank'><FaInstagram /></a>
              <a href="https://www.facebook.com/octaversemmanepal" target='_blank'><FaFacebookF/></a>
              <a href="https://www.youtube.com/@ovmshorts5933/shorts" target='_blank'><FaYoutube/></a>
            </div>
        </div>
    </>
  )
}

export default Header
