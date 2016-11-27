'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AlertIOS
} from 'react-native';

var GameplayListView = require('./GameplayListView.js');

class GameplayScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Hide Info',
        id: 'info',
        disabled: false,
        disableIconTint: true
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      players: props.pushEvent,
      showInfo: true
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'info') {
        this.onInfoButton();
      }
    }
  }

  onInfoButton() {
    // console.log(this.state.showInfo);
    // this.state.showInfo = !this.state.showInfo;
    // this.updateCellsDisplay();
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
    var evilPlayers = this.evilPlayers();
    var numberOfEvilAlive = this.alivePlayers(evilPlayers).length;

    var innocentPlayers = this.innocentPlayers();
    var numberOfInnocentsAlive = this.alivePlayers(innocentPlayers).length;

    if(numberOfEvilAlive == 0) {
      this.finishGame('Innocents');
    }
    if(numberOfInnocentsAlive <= numberOfEvilAlive) {
      this.finishGame('Mafia');
    }
  }

  innocentPlayers() {
    return this.state.players.filter(player => player.role == 'good' || player.role == 'goodMain');
  }

  evilPlayers(){
    return this.state.players.filter(player => player.role == 'evil' || player.role == 'evilMain');
  }

  alivePlayers(players) {
    return players.filter(player => player.isAlive == true);
  }

  finishGame(winner){
    const buttons = [ {text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'},
                      {text: 'Finish',
                      onPress: () => this.goToVictoryScreen()}, ];
    const alertTitle = winner + ' win';
    AlertIOS.alert(alertTitle, null, buttons);
  }

  goToVictoryScreen() {
    this.props.navigator.push({
      screen: 'mafia.VictoryScreen',
      title: 'Victory',
      passProps: {
        pushEvent: this.state.players
      }
    });
  }

  render() {
    return(
      <GameplayListView
        dataSource={this.state.dataSource}
        players={this.state.players}
        onKill={this.onKill.bind(this)}
        updatePlayers={this.updatePlayers.bind(this)}
      />
    );
  }
}

module.exports = GameplayScreen;
