import React, { useState, useEffect } from 'react';
import '../styles/favoriteEpisodes.css';

interface Episode {
  id: number;
  title: string;
  season: number;
  showTitle: string;
  addedDate: string;
}

const FavoriteEpisodes: React.FC = () => {
  const [favorites, setFavorites] = useState<Episode[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const saveFavoritesToLocalStorage = (updatedFavorites: Episode[]) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const removeFromFavorites = (episodeId: number) => {
    const updatedFavorites = favorites.filter((ep) => ep.id !== episodeId);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  const addToFavorites = (episode: Episode) => {
    const newFavorite: Episode = {
      ...episode,
      showTitle: 'podcast.title',
      addedDate: new Date().toLocaleDateString(),
    };
    const updatedFavorites = [...favorites, newFavorite];
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  return (
    <div className="favorite-episodes">
      <h2>Favorite Episodes</h2>
      {favorites.length === 0 ? (
        <p>No favorite episodes yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((episode) => (
            <div key={episode.id} className="favorite-episode">
              <h3>{episode.title}</h3>
              <p>{`${episode.showTitle}, Season ${episode.season}`}</p>
              <p>{`Added: ${episode.addedDate}`}</p>
              <button onClick={() => removeFromFavorites(episode.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteEpisodes;
