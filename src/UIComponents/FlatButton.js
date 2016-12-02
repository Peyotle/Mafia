'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

class FlatButton extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return(
      <TouchableHighlight
        onPress={this.props.onPress}>
        <View style={styles.button}>
        <Text style={styles.buttonText}>
          {this.props.title}
        </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
    height: 40,
    backgroundColor: '#14bbcd',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    margin: 5
  }
});

module.exports = FlatButton;
