import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PodcastGrid.css';

interface Podcast {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface PodcastGridProps {
  podcasts: Podcast[];
}

const PodcastGrid: React.FC<PodcastGridProps> = ({ podcasts }) => {
  const navigate = useNavigate();

  const truncateText = (text: string, maxSentences: number) => {
    const sentences = text.split('.');
    return sentences.slice(0, maxSentences).join('.') + (sentences.length > maxSentences ? '...' : '');
  };

  const handleImageClick = (id: string) => {
    navigate(`/podcast/${id}`);
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
