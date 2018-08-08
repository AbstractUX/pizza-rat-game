import React, { Component } from 'react';
import Rat from './Rat';
import Pizza from './Pizza';
import './PizzaRatGame.css';

export default class PizzaRatGame extends Component {
  state = {
    yourWeight: 0,
    enemyWeight: 0,
    yourTurn: true,
    pizzaData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
  renderPizzas = () => {
    let jsxOfPizzas = this.state.pizzaData.map((size) => {
      return <div className="left">
        <Pizza size={size} addToWeight={this.addToWeight} yourTurn={this.state.yourTurn} />
      </div>
    })
    return (<div>{jsxOfPizzas}</div>)
  }
  addToWeight = (weight, whoseWeight) => {
    if (whoseWeight === 'yourWeight') {
      this.setState((prevState) => ({
        yourWeight: prevState.yourWeight + weight,
        yourTurn: !prevState.yourTurn
      }));
    } else if (whoseWeight === 'enemyWeight') {
      this.setState((prevState) => ({
        enemyWeight: prevState.enemyWeight + weight,
        yourTurn: !prevState.yourTurn
      }));
    }
  }
  render() {
    return (<div>
              <h1>{this.state.yourTurn ? 'It is your turn' : 'It is the enemy\'s turn'}</h1>
              <div className="left">
                <Rat weight={this.state.yourWeight} />
              </div>
              <div className="right">
                <Rat weight={this.state.enemyWeight} />
              </div>
              <div className="pizza-container">
                {this.renderPizzas()}
              </div>
            </div>)
  }
}
