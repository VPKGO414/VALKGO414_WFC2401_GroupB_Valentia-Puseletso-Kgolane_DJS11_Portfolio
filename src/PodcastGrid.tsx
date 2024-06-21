import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import './PodcastGrid.css';

interface PodcastGridProps {
  podcasts: any[];
}

const PodcastGrid: React.FC<PodcastGridProps> = ({ podcasts }) => {
  const navigate = useNavigate(); // Updated hook

  const truncateText = (text: string, maxSentences: number) => {
    const sentences = text.split('.');
    return sentences.slice(0, maxSentences).join('.') + (sentences.length > maxSentences ? '...' : '');
  };

  const handleImageClick = (id: string) => {
    navigate(`/podcast/${id}`); // Updated navigation
  };

  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="podcast-card">
          <img
            src={podcast.image}
            alt={podcast.title}
            onClick={() => handleImageClick(podcast.id)}
            className="podcast-image"
          />
          <h3>{podcast.title}</h3>
          <p>{truncateText(podcast.description, 2)}</p>
        </div>
      ))}
    </div>
  );
};

export default PodcastGrid;
