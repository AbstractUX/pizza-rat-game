import React, { Component } from 'react';
import Rat from './Rat';
import Pizza from './Pizza';
import HowToPlay from './HowToPlay';
import './PizzaRatGame.css';
import Footer from './Footer';

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
    const jsxOfPizzas = this.state.pizzaData.map((eachPizzaData, i) => {
      return <div className="left">
               <Pizza key={eachPizzaData.id} size={eachPizzaData.size} eatenBy={eachPizzaData.eatenBy} eatPizza={this.eatPizza} yourTurn={this.state.yourTurn} id={eachPizzaData.id} />
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
      alert("There are no more pizzas left. Since you went first, the enemy automatically won the game")
      this.endGame('enemy');
    }
  }
  endGame = (whoWon) => {
    this.setState((prevState) => {
      return {
        gameOver: true
      }
    });
  }
  enemyMakesAMove = () => {
    // Enemy makes a move logic here
    const uneatenPizzas = this.state.pizzaData.filter(eachPizzaData => eachPizzaData.eatenBy === null); // Get array of uneaten pizzas
    const enemyAdvantagePizzas = uneatenPizzas.filter(eachUneatenPizza => eachUneatenPizza.size + this.state.yourWeight === 21);

    if (enemyAdvantagePizzas.length > 0) {
      const randomEnemyAdvantagePizza = enemyAdvantagePizzas[Math.floor(Math.random()*enemyAdvantagePizzas.length)];
      this.eatPizza(randomEnemyAdvantagePizza.size, 'enemyWeight', randomEnemyAdvantagePizza.id, 'enemy');
    } else if (uneatenPizzas.length > 0) {
      const randomUneatenPizza = uneatenPizzas[Math.floor(Math.random()*uneatenPizzas.length)]; // Pick a random uneaten pizza
      this.eatPizza(randomUneatenPizza.size, 'enemyWeight', randomUneatenPizza.id, 'enemy'); // Eat it
    }

  }
  componentDidUpdate() {
    if (!this.state.yourTurn) {
        setTimeout(() => {
          this.enemyMakesAMove();
        }, 1000);
    }
    if (!this.state.gameOver) {
      this.checkIfAnyoneWon();
    }
  }
  render() {
    return (<div className="container">
              {this.state.gameOver && <div><h4>If you're tired of pizza, consider treating yourself to a container of <a href="https://amzn.to/2xsdlYD">David's cookies</a> :)</h4><button onClick={() => {window.location.reload()}}>Click here to play again!</button></div>}
              <div className="left">
                <Rat weight={this.state.yourWeight} />
                {!this.state.gameOver && <HowToPlay />}
                {!this.state.gameOver && (this.state.yourTurn ? <h3>It is your turn</h3> : <h3>Enemy's turn...</h3>)}
              </div>
              <div className="right">
                <Rat weight={this.state.enemyWeight} />
              </div>
              <div className="pizza-container">
                {this.renderPizzas()}
              </div>
              <div>
                <Footer />
              </div>
            </div>)
  }
}
