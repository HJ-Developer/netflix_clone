export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTRjOTczNDZmZmI0N2Y2NWJjNDYzMWY3ZDYyNTljOSIsIm5iZiI6MTc2MDY5NDc1Ny4zNjA5OTk4LCJzdWIiOiI2OGYyMTFlNWY0MDhlYTUyMjA1YTUzNDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iUo2c9hZhNhFGnmeuD56wEX8-mwF1NqrpN5pSfSzf5c",
  },
};
export const cred = {
  API_KEY: import.meta.env.VITE_tmbd_API_KEY,
  base_url: import.meta.env.VITE_tmbd_base_url,
  image_url: import.meta.env.VITE_tmbd_image_url,
  thumbnail_url: import.meta.env.VITE_tmbd_thumbnail_url,
};

const requests = {
  fetchNowPlaying: `${cred.base_url}/movie/now_playing?api_key=${cred.API_KEY}&language=en-US`,
  fetchTrending: `${cred.base_url}/trending/all/week?api_key=${cred.API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${cred.base_url}/discover/movie?api_key=${cred.API_KEY}&with_networks=213`,
  fetchTopRated: `${cred.base_url}/movie/top_rated?api_key=${cred.API_KEY}&language=en-US`,
  fetchActionMovies: `${cred.base_url}/discover/movie?api_key=${cred.API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${cred.base_url}/discover/movie?api_key=${cred.API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${cred.base_url}/discover/movie?api_key=${cred.API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${cred.base_url}/discover/movie?api_key=${cred.API_KEY}&language=en-US&withgenres=18749`,
  fetchDocumentaries: `${cred.base_url}/discover/movie?api_key=${cred.API_KEY}&language=en-US&with_genres=99`,
};

export default requests;
