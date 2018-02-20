import React, { Component } from 'react';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w342';

class DisplayRandomMovie extends Component {
  state = {
    movie: {},
  }

  getRandomMovie = async () => {
    fetch('https://api.themoviedb.org/3/movie/latest?api_key=31bd793c883026448a472f7cae25d56e')
      .then(res => res.json())
      .then(latestMovie => {
        const randomId = Math.floor(Math.random() * latestMovie.id);
        return fetch(`https://api.themoviedb.org/3/movie/${randomId}?api_key=31bd793c883026448a472f7cae25d56e&language=fr`);
      })
      .then(res => {
        if (!res.ok) {
          this.getRandomMovie();
        }
        return res.json();
      })
      .then(randomMovie => {
        this.setState({
          movie: randomMovie
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount = () => {
    this.getRandomMovie();
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        <h1>{movie.title}</h1>
        {movie.poster_path && <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />}
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <button onClick={this.getRandomMovie}>Autre film</button>
      </div>
    );
  }
}

export default DisplayRandomMovie;
