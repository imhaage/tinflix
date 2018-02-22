import React, { Component } from 'react';

export default class MyRatings extends Component {
  render() {
    const { title, date, dataId, removeRating } = this.props;
    console.log(removeRating);
    return (
      <tr className="rated-movie">
        <td>{date}</td>
        <td>{title}</td>
        <td><button onClick={() => removeRating(dataId)}>Supprimer</button></td>
      </tr>
    );
  }
}