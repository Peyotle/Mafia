'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class PlayerView extends Component {
  render() {
    var roleStyle = this.roleStyle(this.props.role);
    return (
      <View style={styles.container}>
        <View style={[styles.avatarView, roleStyle]}>
          <Text style={styles.cellText}>{this.props.name}</Text>
        </View>
        <Text style={styles.detailsText}>{this.props.role}</Text>
      </View>
    );
  }

  roleStyle(role: String) {
    switch (role) {
      case 'none':
        break;
      case 'good':
      return styles.goodCell;
        break;
      case 'evil':
      return styles.evilCell;
        break;
      case 'evilMain':
      return styles.evilMainCell;
        break;
      case 'goodMain':
      return styles.goodMainCell;
        break;
      default:
      return styles.neutralCell;
    }
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
  neutralCell: {
    backgroundColor: '#ddd'
  },
  evilCell: {
    backgroundColor: '#f00'
  },
  goodCell: {
    backgroundColor: '#0f0'
  },
  goodMainCell: {
    backgroundColor: '#00f'
  },
  evilMainCell: {
    backgroundColor: '#000'
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
