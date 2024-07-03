import React from 'react';
import { Podcast } from '../types/podcast';
import '../styles/PodcastGrid.css';

interface PodcastGridProps {
  podcasts: Podcast[] | undefined; // Make podcasts props optional
}

const PodcastGrid: React.FC<PodcastGridProps> = ({ podcasts }) => {
  if (!podcasts) {
    // Render loading indicator if podcasts is undefined
    return <div className="podcast-grid-loading">Loading...</div>;
  }

  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="podcast-item">
          <img src={podcast.image} alt={podcast.title} />
          <h3>{podcast.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default PodcastGrid;
