'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  StatusBar,
  Image
} from 'react-native';

var globalStyles = require('../styles');
var FlatButton = require('../UIComponents/FlatButton');

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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.titleContainer}>
          <Image
            style={{width: 50, height: 50, margin: 10}}
            source={{ uri: "Mafia_circle", isStatic: true }}
          />
          <Text style={styles.title}>
            Select the number of players
          </Text>
        </View>

        <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.players}
            onValueChange={(players) => this.setState({players: players})}>
            {pickerItems}
        </Picker>
        <FlatButton title='Get Started' onPress={this.onNextButton.bind(this)} />
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
    transform: [{scale: 1.5}],
    marginTop: 40
  },
  pickerItem: {
     fontSize: 20,
     height: 200,
     margin: 20,
     color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#001',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 80,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 40,
    justifyContent: 'center'
  }
});

module.exports = GroupSizeScreen;
