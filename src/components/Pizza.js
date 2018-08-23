import React, { Component } from 'react';
import pizza from '../img/pizza.png';
import './Pizza.css';

export default class Pizza extends Component {
  // state = {
  //   eaten: null
  // }
  // makePizzaEaten = () => {
    // this.setState(() => ({
    //   eaten: this.props.yourTurn ? 'byYou' : 'byEnemy'
    // }));
  // }
  handleEatPizza = (weightToAddNext) => {
    this.props.eatPizza(this.props.size, weightToAddNext, this.props.id, this.props.eatenBy);
    // this.makePizzaEaten();
  }
  render() {
    const yourTurn = this.props.yourTurn;
    const weightToAddNext = yourTurn ? 'yourWeight' : 'enemyWeight';

    if (this.props.eatenBy === 'you') {
      return (<div>
                <img className="pizza pizza-blue" src={pizza} alt="pizza" />
                <p className="dark-bold">{this.props.size}</p>
              </div>)
    } else if (this.props.eatenBy === 'enemy') {
      return (<div>
                <img className="pizza pizza-red" src={pizza} alt="pizza" />
                <p className="dark-bold">{this.props.size}</p>
              </div>)
    } else if (yourTurn) {
      return (<div onClick={() => this.handleEatPizza(weightToAddNext)}>
                <img className="pizza" src={pizza} alt="pizza" />
                <p className="dark-bold">{this.props.size}</p>
              </div>)
    } else if (!yourTurn) {
      return (<div>
                <img className="pizza" src={pizza} alt="pizza" />
                <p className="dark-bold">{this.props.size}</p>
              </div>)
    }
  }
}
