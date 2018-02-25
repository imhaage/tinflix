import React, { Component } from 'react';
import RatedMovie from './RatedMovie';

export default class MyRatings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRatings: []
    };
    this.getRatingsFromLocalStorage = this.getRatingsFromLocalStorage.bind(this);
    this.removeRating = this.removeRating.bind(this);
  }

  getRatingsFromLocalStorage() {
    const myRatings = Object.keys(localStorage).map(key => {
      return JSON.parse(localStorage.getItem(key));
    }).sort(function (a, b) {
      return b.ratingDate - a.ratingDate;
    });
    this.setState({
      myRatings
    });
  }

  removeRating(id) {
    localStorage.removeItem(id);
    this.getRatingsFromLocalStorage();
  }

  componentWillMount() {
    this.getRatingsFromLocalStorage();
  }

  render() {
    const { myRatings } = this.state;
    console.log(myRatings);
    return (
      <div className="App-content">
        <h1>Mes votes</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Titre</th>
              <th>Notes</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {
              myRatings && myRatings.map(ratedMovie => {
                return <RatedMovie key={ratedMovie.title} title={ratedMovie.title} date={ratedMovie.ratingDate} rating={ratedMovie.rating} dataId={ratedMovie.id} removeRating={this.removeRating} />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}