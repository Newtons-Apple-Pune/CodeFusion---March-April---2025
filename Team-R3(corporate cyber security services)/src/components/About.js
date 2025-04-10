import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <img src="/images/cyber-logo.png" alt="Cybersecurity Logo" className="about-logo" />
      <h2 className="about-title">About Us</h2>
      <p className="about-subtitle">
        We provide top-notch cybersecurity services to protect your business from digital threats.
      </p>

      <div className="about-highlights">
        <div className="highlight-card">
          <h3>🛡️ Trusted Security</h3>
          <p>Serving leading enterprises with reliable threat protection.</p>
        </div>
        <div className="highlight-card">
          <h3>⚙️ Advanced Technology</h3>
          <p>State-of-the-art tools powered by AI and machine learning.</p>
        </div>
        <div className="highlight-card">
          <h3>📈 Proven Results</h3>
          <p>Track record of reducing risks and ensuring compliance.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
