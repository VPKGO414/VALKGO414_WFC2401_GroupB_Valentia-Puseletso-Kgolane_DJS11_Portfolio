import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShow } from './api';
import './PodcastPage.css';

const PodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [podcast, setPodcast] = useState<any>(null);

  useEffect(() => {
    const loadPodcast = async () => {
      const data = await fetchShow(id);
      setPodcast(data);
    };
    loadPodcast();
  }, [id]);

  if (!podcast) {
    return <div>Loading...</div>;
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
        {podcast.seasons.map((season: any) => (
          <div key={season.id} className="season">
            <h2>Season {season.number}</h2>
            {season.episodes.map((episode: any) => (
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
