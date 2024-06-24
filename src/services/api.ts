import axios from 'axios';

const api = axios.create({
  baseURL: 'https://podcast-api.netlify.app', // Replace with your API base URL
});

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genres');
    return response.data; // Assuming response.data is an array of genres
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error; // Handle error as needed
  }
};

export const fetchShowsByGenre = async (genreId: string) => {
  try {
    const response = await api.get(`/genres/${genreId}/shows`);
    return response.data; // Assuming response.data is an array of shows for a given genre
  } catch (error) {
    console.error(`Error fetching shows for genre ${genreId}:`, error);
    throw error; // Handle error as needed
  }
};

export const fetchSeasonsByShow = async (showId: string) => {
  try {
    const response = await api.get(`/shows/${showId}/seasons`);
    return response.data; // Assuming response.data is an array of seasons for a given show
  } catch (error) {
    console.error(`Error fetching seasons for show ${showId}:`, error);
    throw error; // Handle error as needed
  }
};

export const fetchEpisodesBySeason = async (showId: string, seasonNumber: string) => {
  try {
    const response = await api.get(`/shows/${showId}/seasons/${seasonNumber}/episodes`);
    return response.data; // Assuming response.data is an array of episodes for a given show and season
  } catch (error) {
    console.error(`Error fetching episodes for show ${showId}, season ${seasonNumber}:`, error);
    throw error; // Handle error as needed
  }
};
