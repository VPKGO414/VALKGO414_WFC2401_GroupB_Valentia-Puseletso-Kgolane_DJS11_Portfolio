import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import SignInPage from './SignInPage';
import HomePage from './HomePage';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('welcome');

  const handleSignInClick = () => {
    setCurrentPage('loading');
    setTimeout(() => {
      setCurrentPage('sign-in');
    }, 3000); // 3 seconds delay
  };

  const handleSuccessfulSignIn = () => {
    setCurrentPage('home');
  };

  return (
    <div className="App">
      {currentPage === 'welcome' && <WelcomePage onSignInClick={handleSignInClick} />}
      {currentPage === 'loading' && <div className="loading-page"><div className="loading-container">Loading...</div></div>}
      {currentPage === 'sign-in' && <SignInPage onSuccessfulSignIn={handleSuccessfulSignIn} />}
      {currentPage === 'home' && <HomePage />}
    </div>
  );
};

export default App;
