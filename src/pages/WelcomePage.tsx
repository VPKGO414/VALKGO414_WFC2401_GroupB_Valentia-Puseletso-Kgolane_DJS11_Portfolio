import React from 'react';
import '../styles/WelcomePage.css'; // Import the WelcomePage CSS

interface WelcomePageProps {
  onSignInClick: () => void; // Callback function when sign-in button is clicked
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onSignInClick }) => {
  return (
    <div className="welcome-page">
      <h1>Welcome to Podcally</h1>
      <p>Podcasts That Sound Musically</p>
      <button className="sign-in-button" onClick={onSignInClick}>Sign In</button>
    </div>
  );
};

export default WelcomePage;
