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
    return(
      <View style={styles.container}>
        <Text>Hello</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 20
  }
});

module.exports = VictoryScreen;
