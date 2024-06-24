import axios from 'axios';
import { Preview} from '../types';
import { Podcast } from '../types';

const api = axios.create({
  baseURL: 'https://podcast-api.netlify.app',
});

export const fetchPreviews = async (): Promise<Preview[]> => {
  try {
    const response = await api.get('/previews');
    return response.data;
  } catch (error) {
    console.error('Error fetching previews:', error);
    throw error; // Handle error as needed
  }
};

export const fetchGenres = async (): Promise<any[]> => { // Define a specific type if available
  try {
    const response = await api.get('/genres');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error; // Handle error as needed
  }
};

export const fetchShowsByGenre = async (genreId: string): Promise<any[]> => { // Define a specific type if available
  try {
    const response = await api.get(`/genres/${genreId}/shows`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error; // Handle error as needed
  }
};

export const fetchSeasonsByShow = async (showId: string): Promise<any[]> => { // Define a specific type if available
  try {
    const response = await api.get(`/shows/${showId}/seasons`);
    return response.data;
  } catch (error) {
    console.error('Error fetching seasons:', error);
    throw error; // Handle error as needed
  }
};

export const fetchEpisodesBySeason = async (showId: string, seasonNumber: string): Promise<any[]> => { // Define a specific type if available
  try {
    const response = await api.get(`/shows/${showId}/seasons/${seasonNumber}/episodes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error; // Handle error as needed
  }
};

export const fetchShow = async (id: string): Promise<any> => { // Define a specific type if available
  try {
    const response = await api.get(`/id/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching show:', error);
    throw error; // Handle error as needed
  }
};
 
export const fetchPodcasts = async (): Promise<any> => {
  try {
    const response = await api.get();
    return response.data;
  } catch (error) {
    console.error('Error fetching podcast list', error);
  }
}