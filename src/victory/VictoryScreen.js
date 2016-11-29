'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet
} from 'react-native';

class VictoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var winner = 'Mafia'
    var innocentsKilled = 0;
    var evilKilled = 0;
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{winner} won!</Text>
        <Text style={styles.stats}>Mafia killed: {evilKilled}</Text>
        <Text style={styles.stats}>Innocents killed: {innocentsKilled}</Text>

        <Button
          title='Restart'
          onPress={() => this.restartGame()}
        />
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
    paddingTop: 60,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 30,
    margin: 20
  },
  stats: {
    color: '#fff',
    fontSize: 20,
    margin: 10
  }
});

module.exports = VictoryScreen;
