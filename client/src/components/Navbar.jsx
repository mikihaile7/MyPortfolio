// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar-container">
      {/* Custom Logo & Brand */}
      <div className="logo-brand">
        <div className="custom-logo">MH</div>
        <span className="brand-title">Mikias Haile</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          About Me
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Projects
        </NavLink>
        <NavLink to="/education" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Education
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Services
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Contact Me
        </NavLink>
      </div>
    </nav>
  );
}