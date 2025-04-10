import React from 'react';
import './Services.css'; // Make sure this CSS file exists

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Premium Services</h2>
      <p className="services-subtitle">
        We offer a wide range of cybersecurity solutions tailored to your business needs.
      </p>
      <div className="services-list">
        <div className="service-card">
          <h3>🔍 Threat Detection & Response</h3>
          <p>Real-time monitoring and rapid response to threats before they escalate.</p>
        </div>
        <div className="service-card">
          <h3>🛡️ Vulnerability Assessment</h3>
          <p>Identify and fix system weaknesses before they can be exploited.</p>
        </div>
        <div className="service-card">
          <h3>💣 Penetration Testing</h3>
          <p>Simulated cyber attacks to assess your infrastructure’s defense mechanisms.</p>
        </div>
        <div className="service-card">
          <h3>📋 Security Audits</h3>
          <p>Comprehensive audits to ensure your systems meet industry security standards.</p>
        </div>
        <div className="service-card">
          <h3>📘 Compliance Consulting</h3>
          <p>Guidance to achieve and maintain regulatory compliance with global standards.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
