import React, { useEffect, useState } from 'react';

interface Preview {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  // Add more fields as per your API response
}

interface Genre {
  id: number;
  name: string;
  description: string;
  // Add more fields as per your API response
}

interface Episode {
  id: number;
  title: string;
  description: string;
  // Add more fields as per your API response
}

interface Season {
  id: number;
  title: string;
  episodes: Episode[];
  // Add more fields as per your API response
}

interface Show {
  id: number;
  title: string;
  description: string;
  seasons: Season[];
  // Add more fields as per your API response
}

const MyComponent: React.FC = () => {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const previewsResponse = await fetch('https://podcast-api.netlify.app/');
        const genreResponse = await fetch('https://podcast-api.netlify.app/genre/3');
        const showResponse = await fetch('https://podcast-api.netlify.app/id/5');

        const previewsData: Preview[] = await previewsResponse.json();
        const genreData: Genre = await genreResponse.json();
        const showData: Show = await showResponse.json();

        setPreviews(previewsData);
        setGenre(genreData);
        setShow(showData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Display an error message
  }

  return (
    <div>
      <h2>Previews</h2>
      <ul>
        {previews.map((preview) => (
          <li key={preview.id}>
            <strong>{preview.title}</strong>: {preview.description}
          </li>
        ))}
      </ul>
      <h2>Genre</h2>
      <p>Name: {genre?.name}</p>
      <p>Description: {genre?.description}</p>
      <h2>Show</h2>
      <p>Title: {show?.title}</p>
      <p>Description: {show?.description}</p>
      <h3>Seasons:</h3>
      {show?.seasons.map((season) => (
        <div key={season.id}>
          <h4>{season.title}</h4>
          <ul>
            {season.episodes.map((episode) => (
              <li key={episode.id}>
                <strong>{episode.title}</strong>: {episode.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
