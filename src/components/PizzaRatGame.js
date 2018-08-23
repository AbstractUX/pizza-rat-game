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
    pizzaRemaining: 12,
    gameOver: false
  }
  getRandomPizzaData = (numOfPizza) => {
    let pizzaData = [];

    for (let i = 0; i < numOfPizza; i++) {
        let randomNum = Math.floor(Math.random() * 8);
        pizzaData.push({id: i, size: randomNum, eatenBy: null})
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
               <Pizza size={eachPizzaData.size} eatenBy={eachPizzaData.eatenBy} eatPizza={this.eatPizza} yourTurn={this.state.yourTurn} id={eachPizzaData.id} />
             </div>
    })
    return (<div>{jsxOfPizzas}</div>)
  }
  eatPizza = (weight, whoseWeight, id, eatenBy) => {
    let addToYourWeight = 0;
    let addToEnemyWeight = 0;

    if (whoseWeight === 'yourWeight') {
      addToYourWeight = weight;
    } else {
      addToEnemyWeight = weight;
    }

    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.pizzaData = [...prevState.pizzaData];
      newState.pizzaData[id] = {
        ...prevState.pizzaData[id],
        eatenBy: eatenBy
      }
      return {
        yourWeight: prevState.yourWeight + addToYourWeight,
        enemyWeight: prevState.enemyWeight + addToEnemyWeight,
        yourTurn: !prevState.yourTurn,
        pizzaRemaining: prevState.pizzaRemaining - 1,
        pizzaData: newState.pizzaData
      }
    });
    this.checkIfAnyoneWon();
  }
  checkIfAnyoneWon = () => {
    if (this.state.yourWeight === 21) {
      alert("Congratulations, you hit 21 lbs and won the game!");
      this.endGame('you');
    } else if (this.state.enemyWeight === 21) {
      alert("Bummer, the enemy rat hit 21 lbs and won the game");
      this.endGame('enemy');
    };
    if (this.state.yourWeight > 21) {
      alert("Bummer, your rat got too fat and you lose the game");
      this.endGame('enemy');
    } else if (this.state.enemyWeight > 21) {
      alert("Congratulations, the enemy rat got too fat so you win the game!")
      this.endGame('you');
    };
    if (this.state.pizzaRemaining === 0) {
      alert("There are no more pizza left. Since you went first, the enemy automatically won the game")
      this.endGame('enemy');
    }
  }
  endGame = (whoWon) => {
    this.setState((prevState) => {
      return {
        gameOver: true
      }
    });
    //TODO: Make the remaining uneaten pizzas turn black and unclickable
  }
  enemyMakesAMove = () => {
    // Enemy makes a move logic here
    const uneatenPizzas = this.state.pizzaData.filter(eachPizzaData => eachPizzaData.eatenBy === null); // Get array of uneaten pizzas
    const randomUneatenPizza = uneatenPizzas[Math.floor(Math.random()*uneatenPizzas.length)]; // Pick a random uneaten pizza
    this.eatPizza(randomUneatenPizza.size, 'enemyWeight', randomUneatenPizza.id, 'enemy'); // Eat it
  }
  componentDidUpdate() {
    if (!this.state.yourTurn) {
        setTimeout(() => {
          this.enemyMakesAMove();
        }, 1000);
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
