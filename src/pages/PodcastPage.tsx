import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShow } from '../services/api';
import '../styles/PodcastPage.css';

interface Episode {
  id: string;
  title: string;
  description: string;
}

interface Season {
  id: string;
  number: number;
  episodes: Episode[];
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  image: string;
  seasons: Season[];
}

const PodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPodcast = async () => {
      try {
        const data = await fetchShow(id);
        console.log(id)
        setPodcast(data);
      } catch (error) {
        setError('Error fetching podcast.');
      } finally {
        setLoading(false);
      }
    };
    loadPodcast();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!podcast) {
    return <div>Failed to load podcast.</div>;
  }

  return (
    <div className="podcast-page">
      <div className="podcast-header">
        <img src={podcast.image} alt={podcast.title} />
        <div className="podcast-info">
          <h1>{podcast.title}</h1>
          <p>{podcast.description}</p>
        </div>
      </div>
      <div className="podcast-episodes">
        {podcast.seasons.map((season) => (
          <div key={season.id} className="season">
            <h2>Season {season.number}</h2>
            {season.episodes.map((episode) => (
              <div key={episode.id} className="episode">
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastPage;
