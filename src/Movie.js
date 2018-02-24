import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      isRated: false
    };
    this.resetRating = this.resetRating.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.submitRating = this.submitRating.bind(this);
  }

  resetRating() {
    this.setState({
      rating: 0
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({
      rating: nextValue
    });
  }

  submitRating() {
    const { movie } = this.props;
    const { rating } = this.state;
    if (rating !== 0) {
      const key = `${movie.id}`;
      const movieRated = {
        id: movie.id,
        title: movie.title,
        ratingDate: Date.now(),
        rating: rating
      };
      localStorage.setItem(key, JSON.stringify(movieRated));
      this.props.addRatingKey(key);
      this.setState({
        isRated: true
      });
    }
  }

  render() {
    const { movie } = this.props;
    const { rating, isRated } = this.state;
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
        <div className="App-content-movie-rating">
          <StarRatingComponent
            key={`id${movie.id}`}
            className="rating-stars"
            name="rate"
            value={rating}
            onStarClick={this.onStarClick}
            editing={!isRated}
          />
          {
            !isRated &&
            <div>
              <button className="btn btn--reset" onClick={this.resetRating}><i className="fas fa-ban"></i> Reset</button>
              <button className="btn btn--submit" onClick={this.submitRating}><i className="fas fa-check"></i> Valider</button>
            </div>
          }
        </div>


      </div>
    );
  }
}