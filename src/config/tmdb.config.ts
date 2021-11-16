import * as dotenv from 'dotenv';

dotenv.config();

export const tmdbApiHeaders = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
};
