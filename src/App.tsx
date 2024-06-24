import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import PodcastPage from './pages/PodcastPage';
import GenrePage from './pages/GenrePage';
import NavBar from './components/NavBar';
import AudioPlayer from './components/AudioPlayer';
import './styles/App.css';

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
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/podcast/:id" element={<PodcastPage />} />
              <Route path="/genre/:id" element={<GenrePage />} />
              {/* Optional: Redirect to Home for unmatched paths */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <AudioPlayer />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
