import React, { Component } from 'react';
import DisplayRandomMovie from './DisplayRandomMovie';
import MyRatings from './MyRatings';
import logo from './logo.svg';
import tmdbLogo from './tmdbLogo.svg';
import './App.css';
import './spinner.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myVotesHidden: true
    };
  }

  toggleMyVotes = () => {
    this.setState({
      myVotesHidden: !this.state.myVotesHidden
    });
  }

  render() {
    const { myVotesHidden } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-tmdbLogo" src={tmdbLogo} alt="The movie DB logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <button className="btn btn--my-ratings" onClick={this.toggleMyVotes}>{myVotesHidden ? <span>Mes votes</span> : <span>Voter</span>}</button>
        </header>
        {myVotesHidden ? <DisplayRandomMovie /> : <MyRatings />}
      </div>
    );
  }
}