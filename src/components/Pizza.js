import React, { Component } from 'react';
import pizza from '../img/pizza.png';
import './Pizza.css';

export default class Pizza extends Component {
  state = {
    eaten: null
  }
  makePizzaEaten = () => {
    this.setState(() => ({
      eaten: this.props.yourTurn ? 'byYou' : 'byEnemy'
    }));
  }
  handleMakePizzaEatenAndEatPizza = (weightToAddNext) => {
    this.props.eatPizza(this.props.size, weightToAddNext, this.props.id);
    this.makePizzaEaten();
  }
  render() {
    let weightToAddNext = this.props.yourTurn ? 'yourWeight' : 'enemyWeight';

    if (this.state.eaten === null) {
      return (<div onClick={() => this.handleMakePizzaEatenAndEatPizza(weightToAddNext)}>
                <img className="pizza" src={pizza} alt="pizza" />
                <p className="dark-bold">{this.props.size}</p>
              </div>)
    } else if (this.state.eaten === 'byYou') {
      return (<div>
                <img className="pizza pizza-blue" src={pizza} alt="pizza" />
                <p className="dark-bold">{this.props.size}</p>
              </div>)
    } else if (this.state.eaten === 'byEnemy') {
      return (<div>
                <img className="pizza pizza-red" src={pizza} alt="pizza" />
                <p className="dark-bold">{this.props.size}</p>
              </div>)
    }
  }
}
