'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Picker,
  StatusBar
} from 'react-native';

var globalStyles = require('../styles');

class GroupSizeScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      players: 4
    }
  }

  render() {
    const minNumberOfPlayers = 4;
    const maxNumberOfPlayers = 12;
    var pickerItems = [];
    for (var i = minNumberOfPlayers; i <= maxNumberOfPlayers; i++) {
      pickerItems[i] = <Picker.Item
        label={String(i)}
        value={i}
        key={String(i)}
      />
    }
    return(
      <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" />
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.players}
          onValueChange={(players) => this.setState({players: players})}>
          {pickerItems}
      </Picker>
      <Button
        title="Next"
        onPress={this.onNextButton.bind(this)}>
      </Button>
      </View>
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
  picker: {
    transform: [{scale: 1.5}]
  },
  pickerItem: {
     fontSize: 20,
     height: 500,
     margin: 10,
     color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#001'
  },
  title: {
    fontSize: 20
  }
});

module.exports = GroupSizeScreen;
