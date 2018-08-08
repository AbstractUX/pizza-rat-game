import React, { Component } from 'react';
import rat from '../img/rat.gif';

export default class Rat extends Component {
  render() {
    return (<div>
              <img src={rat} alt="rat" />
              <p className="dark-bold">Weighs: {this.props.weight} lbs</p>
            </div>)
  }
}
