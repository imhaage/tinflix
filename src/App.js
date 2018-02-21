import React, { Component } from 'react';
import DisplayRandomMovie from './DisplayRandomMovie';
import logo from './logo.svg';
import tmdbLogo from './tmdbLogo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img className="App-tmdbLogo" src={tmdbLogo} alt="The movie DB logo" />
        </header>
        <section className="App-content">
          <DisplayRandomMovie />
        </section>
      </div>
    );
  }
}

export default App;