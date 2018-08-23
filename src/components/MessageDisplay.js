import React, { Component } from 'react';

export default class MessageDisplay extends Component {
  determineMessageToDisplay = () => {
    let message = this.props.yourTurn ? 'It is your turn' : 'It is the enemy\'s turn';

    if (this.props.messageDisplayOverride) {
      message = this.props.messageDisplayOverride;
    }

    return message;
  }
  render() {
    return (<h1>
              {this.determineMessageToDisplay()}
            </h1>)
  }
}
