import React from 'react';
import { useHistory } from 'react-router-dom';
import './PodcastGrid.css'; // Importing the CSS for grid styling

interface PodcastGridProps {
  podcasts: any[]; // Defining the expected prop type
}

const PodcastGrid: React.FC<PodcastGridProps> = ({ podcasts }) => {
  const history = useHistory();

  const truncateText = (text: string, maxSentences: number) => {
    const sentences = text.split('.');
    return sentences.slice(0, maxSentences).join('.') + (sentences.length > maxSentences ? '...' : '');
  };

  const handleViewMore = (id: string) => {
    history.push(`/podcast/${id}`);
  };

  return (
    <div className="podcast-grid">
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="podcast-card">
          <img src={podcast.image} alt={podcast.title} />
          <h3>{podcast.title}</h3>
          <p>{truncateText(podcast.description, 2)}</p>
          <button onClick={() => handleViewMore(podcast.id)}>View More</button>
        </div>
      ))}
    </div>
  );
};

export default PodcastGrid;
``