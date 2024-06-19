import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import SignInPage from './SignInPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('welcome');

  const handleSignInClick = () => {
    setCurrentPage('loading');
    setTimeout(() => {
      setCurrentPage('sign-in');
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="App">
      {currentPage === 'welcome' && <WelcomePage onSignInClick={handleSignInClick} />}
      {currentPage === 'loading' && <div>Loading...</div>}
      {currentPage === 'sign-in' && <SignInPage />}
    </div>
  );
};

export default App;
