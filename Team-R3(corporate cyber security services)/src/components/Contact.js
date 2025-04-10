import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-subtitle">Reach out for any inquiries or support.</p>

      <div className="contact-cards">
        <div className="contact-card">
          <h3>Email</h3>
          <p>contact@cybersecurity.com</p>
        </div>
        <div className="contact-card">
          <h3>Phone</h3>
          <p>+123-456-7890</p>
        </div>
        <div className="contact-card">
          <h3>Address</h3>
          <p>123 Cyber Lane, Secure City, SS 45678</p>
        </div>
      </div>

    
</div>

  );
};

export default Contact;
