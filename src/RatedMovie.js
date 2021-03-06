import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class MyRatings extends Component {
  render() {
    const { title, date, dataId, rating, removeRating } = this.props;
    const formatedTitle = title.length > 35 ? `${title.slice(0, 35)}[...]` : title;
    const formatedDate = new Date(date).toLocaleString('fr').slice(0, -3);
    return (
      <tr>
        <td title={title}>{formatedTitle}</td>
        <td>{formatedDate}</td>
        <td><StarRatingComponent
          key={dataId}
          className="rated-stars"
          name="rate"
          value={rating}
          editing={false} /></td>
        <td className="ratedDelete"><button className="btn btn--delete" onClick={() => removeRating(dataId)}><i className="fas fa-trash"></i> Supprimer</button></td>
      </tr>
    );
  }
}