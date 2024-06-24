import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GenreSection from '../components/GenreSection';
import { Genre } from '../types';

const GenrePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch genre');
        }
        const data = await response.json();
        setGenre(data);
      } catch (error) {
        setError('Error fetching genre.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!genre) {
    return <div>Failed to load genre.</div>;
  }

  return <GenreSection genre={genre} />;
};

export default GenrePage;
