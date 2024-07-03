import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import './styles/App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'signin' | 'home'>('welcome');

  const handleSignInClick = () => {
    setCurrentPage('signin');
  };

  const handleSignInSuccess = () => {
    setCurrentPage('home');
  };

  const handleNav = (value: boolean) => {
    // Logic to handle navigation (if needed)
  };

  return (
    <div className="App">
      {currentPage === 'welcome' && <WelcomePage onSignInClick={handleSignInClick} />}
      {currentPage === 'signin' && <SignInPage onSignInSuccess={handleSignInSuccess} />}
      {currentPage === 'home' && <HomePage onTileClick={() => {}} hidepopup={() => {}} handleNav={handleNav} />}
    </div>
  );
};

export default App;
