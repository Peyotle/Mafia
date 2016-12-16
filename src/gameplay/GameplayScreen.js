'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AlertIOS,
  Image
} from 'react-native';
import {Navigation} from 'react-native-navigation';

var GameplayListView = require('./GameplayListView.js');
var PlayersHelper = require('../PlayersHelper.js');

class GameplayScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: props.pushEvent,
      deadPlayers: [],
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

  updatePlayers(players, deadPlayers, completion) {
    this.setState ({
      players: players,
      deadPlayers: deadPlayers,
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
    let hideImage = { uri: this.state.hideInfo ? 'Eye' : "Eye_selected", isStatic: true }
    let timeImage = { uri: "Stopwatch_selected", isStatic: true }

    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: this.state.hideInfo ? 'Show' : 'Hide',
          icon: hideImage,
          id: 'info',
          disabled: false,
          disableIconTint: true
        },
        {
          title: 'Time',
          icon: timeImage,
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
        deadPlayers={this.state.deadPlayers}
        onKill={this.onKill.bind(this)}
        updatePlayers={this.updatePlayers.bind(this)}
        hideInfo={this.state.hideInfo}
      />
    );
  }
}

module.exports = GameplayScreen;
