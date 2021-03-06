import React, { Component } from 'react';
import pizza from './img/pizza.png';
import './App.css';

import PizzaRatGame from './components/PizzaRatGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="left position-absolute">Game by <a className="author-signature" href="http://AbstractUX.com">AbstractUX</a></span>
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
