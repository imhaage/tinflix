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
    if (Object.keys(localStorage).length !== 0) {
      this.getRatingsFromLocalStorage();
    }
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
              <th>Heure</th>
              <th>Titre</th>
              <th>Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {
              myRatings && myRatings.reverse().map(ratedMovie => {
                return <RatedMovie key={ratedMovie.title} title={ratedMovie.title} date={ratedMovie.ratingDate} dataId={ratedMovie.id} removeRating={this.removeRating} />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}