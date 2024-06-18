// src/WelcomePage.tsx
import React from 'react';
import './WelcomePage.css';

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <h1>Welcome to Podcally</h1>
        <p>Podcasts That Sound Musically</p>
      </div>
    </div>
  );
};

export default WelcomePage; 