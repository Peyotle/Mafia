'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class PlayerView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.avatarView, this.props.cellStyle]}>
          <Text style={styles.cellText}>{this.props.name}</Text>
        </View>
        <Text style={styles.detailsText}>{this.props.role}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  avatarView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#D7D7D7',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },

  cellText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  detailsText: {
    fontSize: 10,
    color: '#bbb',
    margin: 20
  }
});

module.exports = PlayerView;
