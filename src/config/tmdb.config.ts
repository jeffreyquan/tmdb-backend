export default () => ({
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});
