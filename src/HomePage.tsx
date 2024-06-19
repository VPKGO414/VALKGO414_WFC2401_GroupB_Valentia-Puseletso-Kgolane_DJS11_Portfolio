import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import FeaturedCarousel from './FeaturedCarousel';
import GenreSection from './GenreSection';
import { fetchGenre } from './api';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      // Fetch genre IDs and data here, this is just an example
      const genreData = await fetchGenre('3'); // Replace '3' with the appropriate genre ID or loop through all
      setGenres([genreData]); // Set genres to the fetched data
    };
    loadGenres();
  }, []);

  return (
    <div className="home-page">
      <NavBar />
      <FeaturedCarousel />
      {genres.map((genre) => (
        <GenreSection key={genre.id} genre={genre} />
      ))}
    </div>
  );
};

export default HomePage;
