'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

class PlayerView extends Component {
  render() {
    var roleImage = this.roleImage(this.props.role);
    return (
      <View style={styles.container}>
        <View style={styles.avatarView}>
          <Image
            source={{ uri: roleImage, isStatic: true }}
            style={styles.avatarView}
          />
        </View>
        <Text style={styles.cellText}>{this.props.name}</Text>
        <Text style={styles.detailsText}>{this.props.role}</Text>
      </View>
    );
  }

  roleImage(role: String) {
    switch (role) {
      case 'none':
      return "None_big_ic";
        break;
      case 'good':
      return "Innocent_big_ic";
        break;
      case 'evil':
      return "Mafia_big_ic";
        break;
      case 'evilMain':
      return "Don_big_ic";
        break;
      case 'goodMain':
      return "Sheriff_big_ic";
        break;
      default:
      return "None_big_ic";
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
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  cellText: {
    fontSize: 30,
    marginLeft: 20,
    textAlign: 'center',
    color: '#ddd'
  },
  detailsText: {
    fontSize: 10,
    color: '#bbb',
    margin: 20
  }
});

module.exports = PlayerView;
