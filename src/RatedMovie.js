import React, { Component } from 'react';

export default class MyRatings extends Component {
  render() {
    const { title, date, dataId, removeRating } = this.props;
    const formatedDate = new Date(date).toLocaleDateString('fr');
    const formatedTime = new Date(date).toLocaleTimeString('fr');
    return (
      <tr className="rated-movie">
        <td>{formatedDate}</td>
        <td>{formatedTime}</td>
        <td>{title}</td>
        <td><button onClick={() => removeRating(dataId)}>Supprimer</button></td>
      </tr>
    );
  }
}