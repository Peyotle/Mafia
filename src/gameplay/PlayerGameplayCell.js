'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';

var PlayerView = require('../PlayerView');

class PlayerGameplayCell extends Component {
  render() {
    var cellStyle = this.props.rowData.isAlive ? styles.cellAlive : styles.cellDead;
    return (
      <View style={[styles.cell, cellStyle]}>
        <PlayerView name={this.props.rowData.name} role={this.props.rowData.role} hideInfo={this.props.hideInfo}/>
        <KillButton
          isAlive={this.props.rowData.isAlive}
          style={styles.roleButton}
          onPress={()=> this.props.onKill(this.props.rowData, this.props.rowID)}
        />
      </View>
    );
  }
}

class KillButton extends Component {
  render() {
    var buttonImage;
    var accessibilityLabel;
    if (this.props.isAlive) {

      buttonImage = 'Skull_circle';
      accessibilityLabel = 'Kill the player'
    } else {
      buttonImage = 'Refresh_circle';
      accessibilityLabel = 'Revive the player'
    }
    return(
      <TouchableHighlight onPress={()=> this.props.onPress(this.props.rowData, this.props.rowID)}>
        <Image
          style={styles.button}
          source={{ uri: buttonImage, isStatic: true }}
        />
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#D7D7D7',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roleButton: {

  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  cellAlive: {
    backgroundColor: '#001'
  },
  cellDead: {
    backgroundColor: '#200'
  },
  button: {
    width: 40,
    height: 40
  }

});

module.exports = PlayerGameplayCell;
