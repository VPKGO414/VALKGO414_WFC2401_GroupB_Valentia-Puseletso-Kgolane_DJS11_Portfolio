import React from 'react';

interface WelcomePageProps {
  onSignInClick: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onSignInClick }) => {
  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <h1>Welcome to Podcally!</h1>
        <button onClick={onSignInClick}>Sign In</button>
      </div>
    </div>
  );
};

export default WelcomePage;
