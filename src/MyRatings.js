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

  /* load movie ratings saved in localStorage to this.state.myRatings */
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

  /* remove a movie from localStorage and update this.state.myRatings */
  removeRating(id) {
    localStorage.removeItem(id);
    this.getRatingsFromLocalStorage();
  }

  componentWillMount() {
    this.getRatingsFromLocalStorage();
  }

  render() {
    const { myRatings } = this.state;
    return (
      <div className="my-ratings">
        <h1>Mes votes</h1>
        {
          myRatings.length > 0
            ?
            <table>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Notes</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {
                  myRatings.map(ratedMovie => {
                    return <RatedMovie key={ratedMovie.title} title={ratedMovie.title} date={ratedMovie.ratingDate} rating={ratedMovie.rating} dataId={ratedMovie.id} removeRating={this.removeRating} />;
                  })
                }
              </tbody>
            </table>
            :
            <div className="alert"><strong>Aucune évaluation trouvée.</strong></div>
        }
      </div>
    );
  }
}