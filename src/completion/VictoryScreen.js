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
      // <View style={styles.container}>
        <Text>Hello</Text>
      // </View>
    );
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
    flex: 1
  },
  title: {
    fontSize: 20
  }
});

module.exports = VictoryScreen;
