import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import FavoriteEpisodes from '../components/FavoriteEpisodes';
import '../styles/seasonPage.css';

interface Episode {
  id: number;
  title: string;
  season: number;
  audioUrl: string;
  description: string;
}

interface SeasonPageParams {
  showId: string;
  seasonNumber: string;
}

const SeasonPage: React.FC = () => {
  const { showId, seasonNumber } = useParams<SeasonPageParams>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await api.get(`/shows/${showId}/seasons/${seasonNumber}/episodes`);
        setEpisodes(response.data);
      } catch (error) {
        setError('Error fetching episodes.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [showId, seasonNumber]);

  const addToFavorites = (episode: Episode) => {
    const newFavorite: Episode = {
      ...episode,
      showTitle: 'Example Show',
      addedDate: new Date().toLocaleDateString(),
    };
    // Logic to persist favorite in localStorage or backend
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="season-page">
      <h2>{`Season ${seasonNumber}`}</h2>
      <div className="episode-list">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <h3>{episode.title}</h3>
            <audio controls>
              <source src={episode.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p>{episode.description}</p>
            <button onClick={() => addToFavorites(episode)}>Add to Favorites</button>
          </div>
        ))}
      </div>
      <Link to={`/shows/${showId}`} className="back-link">Back to Show</Link>
      <FavoriteEpisodes />
    </div>
  );
};

export default SeasonPage;
