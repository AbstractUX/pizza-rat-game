import React, { Component } from 'react';

export default class HowToPlay extends Component {
  displayHowToPlay = () => {
    alert('The object of this game is to be the first rat to weigh 21 lbs without going over')
  }
  render() {
    return (<div >
              <button className="large-button" onClick={this.displayHowToPlay}>How to Play</button>
            </div>);
  }
}
