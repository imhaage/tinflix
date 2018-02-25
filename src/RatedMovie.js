import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class MyRatings extends Component {
  render() {
    const { title, date, dataId, rating, removeRating } = this.props;
    const formatedDate = new Date(date).toLocaleString('fr').slice(0, -3);
    return (
      <tr className="rated-movie">
        <td>{formatedDate}</td>
        <td>{title}</td>
        <td><StarRatingComponent
          key={dataId}
          className="rated-stars"
          name="rate"
          value={rating}
          editing={false} /></td>
        <td><button onClick={() => removeRating(dataId)}>Supprimer</button></td>
      </tr>
    );
  }
}