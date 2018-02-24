import React, { Component } from 'react';
import Movie from './Movie';

export default class DisplayRandomMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomMovie: {},
      votes: [],
      myRatingsId: Object.keys(localStorage).length !== 0
        ? Object.keys(localStorage)
        : []
    };
    this.getRandomMovie = this.getRandomMovie.bind(this);
    this.addRatingId = this.addRatingId.bind(this);
  }

  addRatingId(ratingId) {
    this.setState({
      myRatingsId: [...this.state.myRatingsId, ratingId]
    });
  }

  getRandomMovie() {
    /* Request from TMDB randomized using release date, vote_average, and movies in the result page */
    const today = new Date();
    const randomMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomYear = randomMinMax(1976, today.getFullYear());
    const randomMonth = String(randomMinMax(1, 12));
    const randomVoteAverage = (Math.floor(Math.random() * 10) + Math.random()).toFixed(1);
    const randomMovieInResults = randomMinMax(0, 19);

    /* Request to TMDB */
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=31bd793c883026448a472f7cae25d56e&language=fr&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${randomYear}-${randomMonth.length < 2 ? '0' + randomMonth : randomMonth}-01&vote_average.gte=${randomVoteAverage}`)
      .then(response => response.json())
      .then(movieList => {
        const randomMovie = movieList.results[randomMovieInResults] || undefined;
        /* if API response is invalid or movie already rated get a new movie */
        if (randomMovie === undefined || this.state.myRatingsId.indexOf(String(randomMovie.id)) !== -1) {
          this.getRandomMovie();
        } else {
          this.setState({
            randomMovie: movieList.results[randomMovieInResults]
          });
        }
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getRandomMovie();
  }

  render() {
    const { randomMovie } = this.state;
    return (
      <div>
        <div>
          <Movie
            movie={randomMovie}
            key={randomMovie.id}
            addRatingId={this.addRatingId}
            getRandomMovie={this.getRandomMovie}
          />
          <button className="btn btn--next-movie" onClick={this.getRandomMovie} >
            <i className="fas fa-sync"></i> Film suivant
          </button>
        </div>
      </div>
    );
  }
}