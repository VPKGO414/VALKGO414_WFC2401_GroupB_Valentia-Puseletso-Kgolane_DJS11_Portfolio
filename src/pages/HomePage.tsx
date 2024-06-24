import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import PodcastGrid from '../components/PodcastGrid';
import { fetchPreviews, fetchPodcasts} from '../services/api';
import { Podcast, Episode } from '../types';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [error, setError] = useState<string | null>(null);
console.log('xsNBCDS')
  useEffect(() => {
    const loadContent = async () => {
      try {
        // const [podcastData, previewData] = await Promise.all([
        //   fetchPodcasts(),
        //   fetchPreviews()
        // ]);
        const podcastData = await fetchPodcasts();
        console.log(podcastData)
        setPodcasts(podcastData);
        // setPreviews(previewData);
      } catch (error) {
        setError(error.message);
        console.error('Error loading content:', error);
      }
    };
    loadContent();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="home-page">
      <NavBar />
      <h1>Welcome to Podcally</h1>
      <FeaturedCarousel previews={podcasts} /> 
      <PodcastGrid podcasts={podcasts} onEpisodeClick={handleEpisodeClick} />
      {selectedEpisode && (
        <div className="audio-player">
          <h2>Now Playing: {selectedEpisode.title}</h2>
          <audio controls src={selectedEpisode.audioUrl} autoPlay />
        </div>
      )}
    </div>
  );
};

export default HomePage;
