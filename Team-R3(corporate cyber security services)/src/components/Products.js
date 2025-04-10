// src/components/Products.jsx
import React from 'react';
import './Products.css';

const Products = () => {
  return (
    <div className="products-container">
      <h2 className="products-title">Our Cybersecurity Products</h2>
      <p className="products-subtitle">Cutting-edge tools to protect your digital ecosystem.</p>
      
      <div className="product-grid">
        {[
          {
            title: 'Firewall Protection',
            description: 'Defend your network against unauthorized access with advanced firewall solutions.',
          },
          {
            title: 'Threat Intelligence Platform',
            description: 'Real-time analysis of cyber threats using AI-powered threat detection.',
          },
          {
            title: 'Endpoint Security',
            description: 'Comprehensive protection for devices, preventing malware and zero-day attacks.',
          },
          {
            title: 'Cloud Security Suite',
            description: 'Secure your cloud infrastructure with powerful access control and threat monitoring tools.',
          },
          {
            title: 'Identity and Access Management (IAM)',
            description: 'Ensure only authorized personnel can access critical systems with multi-factor authentication.',
          },
          {
            title: 'Data Loss Prevention (DLP)',
            description: 'Prevent sensitive data leaks through email, web, and endpoint security policies.',
          },
          {
            title: 'SIEM',
            description: 'Centralized logging and real-time event correlation for proactive threat response.',
          },
          {
            title: 'Secure VPN Gateway',
            description: 'Enable remote access while ensuring encrypted and private communications.',
          },
        ].map((product, index) => (
          <div key={index} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
