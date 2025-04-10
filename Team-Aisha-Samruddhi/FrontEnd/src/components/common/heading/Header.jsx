import React, { useState } from "react";
import Head from "./Head";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [click, setclick] = useState(false);
  return (
    <>
      <div className="back"> </div>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setclick(false)}
          >
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/allcourses">AVAILABLE COURSES</Link>
            </li>
            <li>
              <Link to="/teachers">OUR TEACHERS</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT US</Link>
            </li>
            <li>
              <Link to="/register">Demo Registration</Link>
            </li>
          </ul>


          <div className="start">
            <li style={{marginTop:'0'}}>
              <Link to="/login">
                <span style={{ display: "block",marginTop:'0' }}>LOGIN</span>
                <span style={{ display: "block",marginTop:'0' }}>HERE</span>
              </Link>
            </li>
          </div>

          <button className="toggle" title="toggle-button" onClick={() => setclick(!click)}>
            {click ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
