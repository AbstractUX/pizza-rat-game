import React, { Component } from 'react';
import Rat from './Rat';
import Pizza from './Pizza';
import HowToPlay from './HowToPlay';
import './PizzaRatGame.css';

export default class PizzaRatGame extends Component {
  state = {
    yourWeight: 0,
    enemyWeight: 0,
    yourTurn: true,
    pizzaData: [],
    pizzaRemaining: 10
  }
  getRandomPizzaData = (numOfPizza) => {
    let pizzaData = [];

    for (let i = 0; i < numOfPizza; i++) {
        let randomNum = Math.floor(Math.random() * 10);
        pizzaData.push({id: i, size: randomNum})
    }

    return pizzaData;
  }
  componentWillMount() {
    let pizzaData = this.getRandomPizzaData(this.state.pizzaRemaining);
    this.setState(() => ({
      pizzaData
    }));
  }
  renderPizzas = () => {
    let jsxOfPizzas = this.state.pizzaData.map((eachPizzaData) => {
      return <div className="left">
               <Pizza size={eachPizzaData.size} eatPizza={this.eatPizza} yourTurn={this.state.yourTurn} id={eachPizzaData.id} />
             </div>
    })
    return (<div>{jsxOfPizzas}</div>)
  }
  eatPizza = (weight, whoseWeight, id) => {
    if (whoseWeight === 'yourWeight') {
      this.setState((prevState) => ({
        yourWeight: prevState.yourWeight + weight,
        yourTurn: !prevState.yourTurn,
        pizzaRemaining: prevState.pizzaRemaining - 1
      }));
    } else if (whoseWeight === 'enemyWeight') {
      this.setState((prevState) => ({
        enemyWeight: prevState.enemyWeight + weight,
        yourTurn: !prevState.yourTurn,
        pizzaRemaining: prevState.pizzaRemaining - 1
      }));
    }
  }
  componentDidUpdate() {
    if (this.state.yourWeight === 21) {
      alert("Congratulations, you hit 21 lbs and won the game!");
    } else if (this.state.enemyWeight === 21) {
      alert("Bummer, the enemy rat hit 21 lbs and won the game");
    };
    if (this.state.yourWeight > 21) {
      alert("Bummer, your rat got too fat and you lose the game");
    } else if (this.state.enemyWeight > 21) {
      alert("Congratulations, the enemy rat got too fat so you win the game!")
    };
    if (this.state.pizzaRemaining === 0) {
      alert("There are no more pizza left. The game is a draw.")
    }
  }
  render() {
    return (<div>
              <h1>{this.state.yourTurn ? 'It is your turn' : 'It is the enemy\'s turn'}</h1>
              <HowToPlay />
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
