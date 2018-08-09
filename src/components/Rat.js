import React, { Component } from 'react';
import rat from '../img/rat.gif';
import './Rat.css';

export default class Rat extends Component {
  render() {
    return (<div>
              <img className="rat" src={rat} alt="rat" />
              <p className="dark-bold">Weighs: {this.props.weight} lbs</p>
            </div>)
  }
}
