import React, { Component } from 'react';
import pizza from './img/pizza.png';
import './App.css';

import PizzaRatGame from './components/PizzaRatGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={pizza} className="App-logo" alt="pizza logo" />
          <h1 className="App-title">Welcome to the Pizza Rat Game</h1>
        </header>
        <div>
          <PizzaRatGame />
        </div>
      </div>
    );
  }
}

export default App;
