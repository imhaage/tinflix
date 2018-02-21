import React, { Component } from 'react';
import DisplayRandomMovie from './DisplayRandomMovie';
import MyVotes from './MyVotes';
import logo from './logo.svg';
import tmdbLogo from './tmdbLogo.svg';
import './App.css';

class App extends Component {
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
          <img src={logo} className="App-logo" alt="logo" />
          <img className="App-tmdbLogo" src={tmdbLogo} alt="The movie DB logo" />
        </header>
        <section className="App-content">
          <button className="btn" onClick={this.toggleMyVotes}>Mes votes</button>
          {myVotesHidden ? <DisplayRandomMovie /> : <MyVotes />}
        </section>
      </div>
    );
  }
}

export default App;