// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // optional for styling

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <button className="menu-button" onClick={toggleMenu}>
        &#8942;
      </button>
      <div className={`menu-dropdown ${menuOpen ? 'menu-active' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/services" onClick={toggleMenu}>Services</Link>
        <Link to="/products" onClick={toggleMenu}>Products</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
      </div>
    </>
  );
};

export default Header;
