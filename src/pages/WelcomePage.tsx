import React from 'react';
import '../styles/WelcomePage.css';

interface WelcomePageProps {
  onSignInClick: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onSignInClick }) => {
  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <h1>Welcome to Podcally</h1>
        <p>Podcasts That Sound Musically</p>
        <button className="sign-in-button" onClick={onSignInClick}>Sign In</button>
      </div>
    </div>
  );
};

export default WelcomePage;
