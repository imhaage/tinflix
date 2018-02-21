import React, { Component } from 'react';
import Movie from './Movie';

class DisplayRandomMovie extends Component {
  state = {
    movie: {},
  }

  getRandomMovie = async () => {
    fetch('https://api.themoviedb.org/3/movie/latest?api_key=31bd793c883026448a472f7cae25d56e')
      .then(res => res.json())
      .then(latestMovie => {
        const randomId = Math.floor(Math.random() * latestMovie.id);
        return fetch(`https://api.themoviedb.org/3/movie/${randomId}?api_key=31bd793c883026448a472f7cae25d56e&language=fr&include_adult=false`);
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          this.getRandomMovie();
          throw new Error(res.statusText);
        }
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
    return (
      <div>
        <button className="btn" onClick={this.history}>Mes votes</button>
        <button className="btn btn--red" onClick={this.getRandomMovie}>Film suivant</button>
        <Movie movie={this.state.movie} />
      </div>
    );
  }
}

export default DisplayRandomMovie;
