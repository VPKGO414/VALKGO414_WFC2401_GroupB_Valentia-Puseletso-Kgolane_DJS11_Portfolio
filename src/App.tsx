import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
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
        <NavBar /> {/* Render your NavBar component */}
        {currentPage === 'welcome' && <WelcomePage onSignInClick={handleSignInClick} />}
        {currentPage === 'loading' && <div className="loading-page"><div className="loading-container">Loading...</div></div>}
        {currentPage === 'sign-in' && <SignInPage onSuccessfulSignIn={handleSuccessfulSignIn} />}
        {currentPage === 'home' && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/podcast/:id" element={<PodcastPage />} />
            {/* Add more routes as needed */}
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
