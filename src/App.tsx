import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import AudioPlayer from './components/AudioPlayer';
import FeaturedCarousel from './components/FeaturedCarousel';
import GenreSection from './components/GenreSection';
import PodcastGrid from './components/PodcastGrid';
import PopUp from './components/PopUp';
import LoadIcon from './components/LoadIcon';
import Header from './components/Header';

const App: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const handleSignIn = () => {
        setAuthenticated(true);
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={authenticated ? <Navigate to="/home" /> : <WelcomePage onSignInClick={handleSignIn} />}
                    />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route
                        path="/home"
                        element={
                            authenticated ? (
                                <HomePage />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>
                {authenticated && (
                    <>
                        <NavBar />
                        <AudioPlayer />
                        <Header />
                        <FeaturedCarousel />
                        <GenreSection />
                        <PodcastGrid />
                        <PopUp />
                        <LoadIcon />
                    </>
                )}
            </div>
        </Router>
    );
};

export default App;
