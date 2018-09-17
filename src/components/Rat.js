import React, { Component } from 'react';
import rat from '../img/rat.gif';
import './Rat.css';

export default class Rat extends Component {
  render() {
    return (<div>
              <img className="rat" src={rat} alt="rat" />
              <h3>Weighs: {this.props.weight} lbs</h3>
            </div>)
  }
}
