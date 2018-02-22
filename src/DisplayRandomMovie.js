import React, { Component } from 'react';
import Movie from './Movie';

export default class DisplayRandomMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomMovie: {},
      votes: []
    }
  }

  getRandomMovie = () => {
    const today = new Date();
    const randomMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomYear = randomMinMax(1960, today.getFullYear());
    const randomMonth = String(randomMinMax(1, 12));
    const randomVoteAverage = (Math.floor(Math.random() * 10) + Math.random()).toFixed(1);
    const randomMovieInPage = randomMinMax(0, 19);

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=31bd793c883026448a472f7cae25d56e&language=fr&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${randomYear}-${randomMonth.length < 2 ? '0' + randomMonth : randomMonth}-01&vote_average.gte=${randomVoteAverage}`)
      .then(response => response.json())
      .then(movieList => {
        this.setState({
          randomMovie: movieList.results[randomMovieInPage]
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount = () => {
    this.getRandomMovie();
  }

  render() {
    const { randomMovie } = this.state;
    return (
      <div>
        <Movie movie={randomMovie} key={randomMovie.id} />
        <button className="btn btn--next-movie" onClick={this.getRandomMovie}>Film suivant</button>
      </div>
    );
  }
}