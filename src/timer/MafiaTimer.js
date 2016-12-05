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
import {Navigation} from 'react-native-navigation';

var globalStyles = require('../styles');
var FlatButton = require('../UIComponents/FlatButton');

class MafiaTimer extends Component {
  constructor(props) {
    super(props);

    this.state={

    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Timer</Text>
        <View></View>
        <FlatButton title='Dismiss' onPress={this.dismiss.bind(this)} />
      </View>
    );
  }

  dismiss() {
    Navigation.dismissLightBox();
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'info') {
        this.onInfoButton();
      } else if (event.id == 'time') {
        this.onTimerButton();
      } else if (event.id == 'dismiss') {
        // this.dismissTimer();
        console.log('Dismiss');
      }
    }
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 80,
  }
});

module.exports = MafiaTimer;
