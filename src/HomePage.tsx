import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import FeaturedCarousel from './FeaturedCarousel';
import PodcastGrid from './PodcastGrid';
import { fetchPreviews } from './api';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
    const loadPodcasts = async () => {
      const data = await fetchPreviews();
      setPodcasts(data);
    };
    loadPodcasts();
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      <FeaturedCarousel />
      <PodcastGrid podcasts={podcasts} />
    </div>
  );
};

export default HomePage;
