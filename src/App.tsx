import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(true);

  const handleSignInClick = () => {
    setShowWelcomePage(false); // Switch to SignInPage
  };

  return (
    <div className="app">
      {showWelcomePage ? (
        <WelcomePage onSignInClick={handleSignInClick} />
      ) : (
        <SignInPage />
      )}
    </div>
  );
};

export default App;
