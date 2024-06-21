import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated to use Routes instead of Switch
import WelcomePage from './WelcomePage';
import SignInPage from './SignInPage';
import HomePage from './HomePage';
import PodcastPage from './PodcastPage';
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
    <Router>
      <div className="App">
        {currentPage === 'welcome' && <WelcomePage onSignInClick={handleSignInClick} />}
        {currentPage === 'loading' && <div className="loading-page"><div className="loading-container">Loading...</div></div>}
        {currentPage === 'sign-in' && <SignInPage onSuccessfulSignIn={handleSuccessfulSignIn} />}
        {currentPage === 'home' && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/podcast/:id" element={<PodcastPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
