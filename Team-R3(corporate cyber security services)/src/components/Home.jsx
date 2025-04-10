// Home.jsx
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div>
      <div className="home-hero">
  <div className="home-hero-content">
    <h1>Welcome to Corporate Cyber Security Services</h1>
    <p>Protecting your digital world with cutting-edge cybersecurity solutions</p>
    <a href="#products" className="home-btn">Explore Our Solutions</a>
  </div>
</div>
      {/* Our Mission Section */}
      <div className="mission-section">
        <h2>Why Choose Us?</h2>
        <p className="mission-intro"> our mission is to empower businesses and individuals with state-of-the-art cybersecurity solutions. We believe in a safe and secure digital future.</p>

        <div className="mission-cards">
          <div className="mission-card">
            <h3>🔒 Trusted Protection</h3>
            <p>Our technologies are trusted by Fortune 500 companies to keep their data safe from all cyber threats.</p>
          </div>
          <div className="mission-card">
            <h3>⚡ Real-Time Monitoring</h3>
            <p>24/7 live threat detection and response to neutralize attacks before they cause harm.</p>
          </div>
          <div className="mission-card">
            <h3>🧠 Expert Intelligence</h3>
            <p>Our cybersecurity team consists of ethical hackers, analysts, and engineers at the top of their field.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
