import React from 'react';
import '../styles/WelcomePage.css';

interface WelcomePageProps {
  onSignInClick: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onSignInClick }) => {
  return (
    <div className="welcome-page">
      <h1>Welcome to Podcally</h1>
      <p>Podcasts That Sound Musically</p>
      <button onClick={onSignInClick}>Sign In</button>
    </div>
  );
};

export default WelcomePage;
