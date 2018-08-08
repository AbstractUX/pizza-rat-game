import React, { Component } from 'react';
import pizza from '../img/pizza.png';
import './Pizza.css';

export default class Pizza extends Component {
  render() {
    let weightToAddNext = this.props.yourTurn ? 'yourWeight' : 'enemyWeight';

    return (<div onClick={() => this.props.addToWeight(this.props.size, weightToAddNext)}>
              <img className="pizza" src={pizza} alt="pizza" />
              <p className="dark-bold">{this.props.size}</p>
            </div>)
  }
}
