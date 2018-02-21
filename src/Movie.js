import React, { Component } from 'react';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';

export default class Movie extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="App-content-movie">
        <h1>{movie.title}</h1>
        <p>Date de sortie: {movie.release_date
          ? movie.release_date.split('-').reverse().join('/')
          : 'Non disponible'}
        </p>
        <div className="App-content-poster">
          {movie.poster_path
            ? <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
            : <div>Image non disponible</div>}
        </div>
      </div>
    );
  }
}