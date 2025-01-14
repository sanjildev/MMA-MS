import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import News from '../pages/News';
import AboutUs from '../pages/AboutUs';
import Fighters from '../pages/Fighters';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/fighters" element={<Fighters />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default AppRoutes;
