import React from 'react';
import './GenreSection.css';

interface GenreSectionProps {
  genre: any;
}

const GenreSection: React.FC<GenreSectionProps> = ({ genre }) => {
  return (
    <div className="genre-section">
      <h2>{genre.name}</h2>
      <div className="genre-scroll">
        {genre.podcasts.map((podcast: any) => (
          <div key={podcast.id} className="podcast-card">
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
