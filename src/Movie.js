import React from 'react';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';

const Movie = ({ movie }) => (
  <div className="App-content-movie">
    <h1>{movie.title}</h1>
    <div className="App-content-poster">
      {movie.poster_path
        ? <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        : <div>Image non disponible</div>}
    </div>
    <p>Date de sortie: {movie.release_date
      ? movie.release_date.split('-').reverse().join('/')
      : 'Non disponible'}
    </p>
  </div>
);

export default Movie;