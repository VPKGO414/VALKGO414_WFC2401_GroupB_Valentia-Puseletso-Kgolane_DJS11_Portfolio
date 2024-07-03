import React, { useEffect, useState } from 'react';
import { getGenres } from '../utils/api';
import '../styles/GenreSection.css';

interface Genre {
  id: string;
  name: string;
}

const GenreSection: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const fetchedGenres = await getGenres();
      setGenres(fetchedGenres);
    }

    fetchGenres();
  }, []);

  return (
    <div className="genre-section">
      <h2>Explore Genres</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreSection;
