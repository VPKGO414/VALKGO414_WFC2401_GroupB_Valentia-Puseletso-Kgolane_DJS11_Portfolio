import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GenreSection from '../components/GenreSection';

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

const GenrePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch genre');
        }
        const data = await response.json();
        setGenre(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genre:', error);
        setLoading(false); // Ensure loading state is set to false on error
      }
    };

    fetchGenre();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!genre) {
    return <div>Failed to load genre.</div>;
  }

  return <GenreSection genre={genre} />;
};

export default GenrePage;
