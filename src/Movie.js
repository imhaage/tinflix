import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';

export default class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  onStarClick(nextValue, prevValue, name) {
    console.log(nextValue, prevValue, name);
    this.setState({ rating: nextValue });
  }

  componentDidMount() {
    this.setState({
      rating: 0
    });
  }

  render() {
    const { movie } = this.props;
    const { rating } = this.state;
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
        <StarRatingComponent
          className="rating-stars"
          name="rate1"
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

