const BASE_URL = `https://api.themoviedb.org/3`;

const getEndpoint = (endpoint: string) => `${BASE_URL}/${endpoint}`;

export const endpoints = {
  SEARCH: getEndpoint('search/movie'),
  MOVIE: getEndpoint('movie'),
  PERSON_DETAILS: getEndpoint('person'),
};
