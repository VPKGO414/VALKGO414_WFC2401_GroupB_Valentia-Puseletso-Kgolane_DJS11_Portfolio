import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import PodcastGrid from '../components/PodcastGrid';
import { fetchPreviews } from '../services/api';
import '../styles/HomePage.css';

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
