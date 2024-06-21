const BASE_URL = 'https://podcast-api.netlify.app';

// Fetch previews of podcasts
export const fetchPreviews = async () => {
  const response = await fetch(`${BASE_URL}`);
  return response.json();
};

// Fetch genre data
export const fetchGenre = async (id: string) => {
  const response = await fetch(`${BASE_URL}/genre/${id}`);
  return response.json();
};

// Fetch show data
export const fetchShow = async (id: string) => {
  const response = await fetch(`${BASE_URL}/id/${id}`);
  return response.json();
};
