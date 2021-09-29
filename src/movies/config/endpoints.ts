const BASE_URL = `https://api.themoviedb.org/3/`;

const getEndpoint = (endpoint: string) =>
  `${BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}`;

export const endpoints = {
  search: getEndpoint('search/movie'),
};
