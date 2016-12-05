'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AlertIOS
} from 'react-native';
import {Navigation} from 'react-native-navigation';

var GameplayListView = require('./GameplayListView.js');
var PlayersHelper = require('../PlayersHelper.js');

class GameplayScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: props.pushEvent,
      hideInfo: false
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'info') {
        this.onInfoButton();
      } else if (event.id == 'time') {
        this.onTimerButton();
      }
    }
  }

  onInfoButton() {
    this.setState ({hideInfo: !this.state.hideInfo});
  }

  onTimerButton() {
    Navigation.showLightBox({
      screen: "mafia.MafiaTimer",
      passProps: {},
      style: {
        backgroundBlur: "dark",
        backgroundColor: "#00002280"
      }
    });
  }

  updatePlayers(players, completion) {
    this.setState ({
      players: players
    }, completion);
  }

  onKill() {
    this.checkGameResult();
  }

  checkGameResult() {
    var evilPlayers = PlayersHelper.evilPlayers(this.state.players);
    var numberOfEvilAlive = PlayersHelper.alivePlayers(evilPlayers).length;

    var innocentPlayers = PlayersHelper.innocentPlayers(this.state.players);
    var numberOfInnocentsAlive = PlayersHelper.alivePlayers(innocentPlayers).length;

    if(numberOfEvilAlive == 0) {
      this.finishGame('Innocents');
    }
    if(numberOfInnocentsAlive <= numberOfEvilAlive) {
      this.finishGame('Mafia');
    }
  }

  finishGame(winner){
    const buttons = [ {text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'},
                      {text: 'Finish',
                      onPress: () => this.goToVictoryScreen(winner)}, ];
    const alertTitle = winner + ' win';
    AlertIOS.alert(alertTitle, null, buttons);
  }

  goToVictoryScreen(winner) {
    this.props.navigator.push({
      screen: 'mafia.VictoryScreen',
      title: 'Victory',
      passProps: {
        players: this.state.players,
        winner: winner
      }
    });
  }

  render() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: this.state.hideInfo ? 'Show' : 'Hide',
          id: 'info',
          disabled: false,
          disableIconTint: true
        },
        {
          title: 'Time',
          id: 'time',
          disabled: false,
          disableIconTint: true
        }
      ]
    });

    return(
      <GameplayListView
        dataSource={this.state.dataSource}
        players={this.state.players}
        onKill={this.onKill.bind(this)}
        updatePlayers={this.updatePlayers.bind(this)}
        hideInfo={this.state.hideInfo}
      />
    );
  }
}

module.exports = GameplayScreen;
