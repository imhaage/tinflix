import React, { Component } from 'react';
import Movie from './Movie';

export default class DisplayRandomMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomMovie: {},
      votes: [],
      myRatingsKeys: Object.keys(localStorage).length !== 0
        ? Object.keys(localStorage)
        : []
    };
    this.getRandomMovie = this.getRandomMovie.bind(this);
    this.addRatingKey = this.addRatingKey.bind(this);
  }

  addRatingKey(ratingKey) {
    this.setState({
      myRatingsKeys: [...this.state.myRatingsKeys, ratingKey]
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
        const randomMovie = movieList.results[randomMovieInResults];
        /* if API response is invalid or if movie is already rated get another movie */
        if (!randomMovie || this.state.myRatingsKeys.includes(randomMovie.id)) {
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
    console.log(this.state.myRatingsKeys);
    return (
      <div>
        {
          randomMovie.id &&
          <div>
            <Movie movie={randomMovie} key={randomMovie.id} addRatingKey={this.addRatingKey} />
            <button className="btn btn--next-movie" onClick={this.getRandomMovie} >
              <i className="fas fa-sync"></i> Film suivant
            </button>
          </div>
        }
      </div>
    );
  }
}