'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Button
} from 'react-native';

var PlayerView = require('../PlayerView');
class PlayerGameplayCell extends Component {
  render() {
    var cellStyle = this.props.rowData.isAlive ? styles.cellAlive : styles.cellDead;
    return (
      <View style={[styles.cell, cellStyle]}>
        <PlayerView name={this.props.rowData.name} role={this.props.rowData.role}/>
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
    var buttonTitle;
    var accessibilityLabel;
    if (this.props.isAlive) {
      buttonTitle = 'Kill';
      accessibilityLabel = 'Kill the player'
    } else {
      buttonTitle = 'Revive';
      accessibilityLabel = 'Revive the player'
    }
    return(
      <Button
        onPress={()=> this.props.onPress(this.props.rowData, this.props.rowID)}
        title={buttonTitle}
        color="#841584"
        accessibilityLabel={accessibilityLabel}
      />
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
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  cellAlive: {
    backgroundColor: '#fff'
  },
  cellDead: {
    backgroundColor: '#ddd'
  },

});

module.exports = PlayerGameplayCell;
