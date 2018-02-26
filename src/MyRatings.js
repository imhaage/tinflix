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
    this.removeAll = this.removeAll.bind(this);
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

  /* remove a rated movie from localStorage and update this.state.myRatings */
  removeRating(id) {
    localStorage.removeItem(id);
    this.getRatingsFromLocalStorage();
  }

  /* remove all rated movies from localStorage and update this.state.myRatings */
  removeAll() {
    localStorage.clear();
    this.setState({
      myRatings: []
    });
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
            <div>
              <button className="btn btn--delete-all" onClick={this.removeAll}><i className="fas fa-trash"></i> Supprimer tout</button>
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
            </div>
            :
            <div className="alert"><strong>Aucune évaluation trouvée.</strong></div>
        }
      </div>
    );
  }
}