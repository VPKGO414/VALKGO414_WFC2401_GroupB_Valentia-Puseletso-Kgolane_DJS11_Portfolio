import React from 'react';
import '../styles/GenreSection.css';

interface Podcast {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Genre {
  id: number;
  name: string;
  podcasts: Podcast[];
}

interface GenreSectionProps {
  genre: Genre | null;
}

const GenreSection: React.FC<GenreSectionProps> = ({ genre }) => {
  if (!genre) {
    return <div>Loading...</div>;
  }

  return (
    <div className="genre-section">
      <h2>{genre.name}</h2>
      <div className="genre-scroll">
        {genre.podcasts.map((podcast) => (
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
