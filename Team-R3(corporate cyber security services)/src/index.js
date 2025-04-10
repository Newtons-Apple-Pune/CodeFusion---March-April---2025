// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // import from 'react-dom/client'
import './index.css';  // If you have any styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
