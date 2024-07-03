import React from 'react';
import Button from '../components/Button';
import '../styles/WelcomePage.css';

interface WelcomePageProps {
  onSignInClick: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onSignInClick }) => {
  return (
    <div className="welcome-page">
      <h1>Welcome to Podcally</h1>
      <p>Podcasts That Sound Musically</p>
      <Button onClick={onSignInClick}>Sign In</Button>
    </div>
  );
};

export default WelcomePage;
