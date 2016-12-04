'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

var PlayersHelper = require('../PlayersHelper.js');
var FlatButton = require('../UIComponents/FlatButton');

class VictoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var winner = this.props.winner;

    var evilPlayers = PlayersHelper.evilPlayers(this.props.players);
    var numberOfEvilAlive = PlayersHelper.alivePlayers(evilPlayers).length;

    var innocentPlayers = PlayersHelper.innocentPlayers(this.props.players);
    var numberOfInnocentsAlive = PlayersHelper.alivePlayers(innocentPlayers).length;

    var innocentsKilled = innocentPlayers.length - numberOfInnocentsAlive;
    var evilKilled = evilPlayers.length - numberOfEvilAlive;


    return(
      <View style={styles.container}>
        <Text style={styles.title}>{winner} won!</Text>
        <View style={{paddingLeft: 40}}>
          <Text style={styles.stats}>Mafia killed: {evilKilled}</Text>
          <Text style={styles.stats}>Innocents killed: {innocentsKilled}</Text>
        </View>
        <FlatButton title='Restart' onPress={this.restartGame.bind(this)} />
      </View>
    );
  }

  restartGame(){
    this.props.navigator.popToRoot();
  }

  onNextButton() {
    this.props.navigator.push({
      screen: 'mafia.RoleSelectionScreen',
      title: 'Roles',
      passProps: {
        pushEvent: this.state.players
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 80,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    margin: 20,
    textAlign: 'center'
  },
  stats: {
    color: '#fff',
    fontSize: 20,
    margin: 10
  }
});

module.exports = VictoryScreen;
