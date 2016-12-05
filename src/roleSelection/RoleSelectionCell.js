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

class RoleSelectionCell extends Component {

  render() {
    const player = this.props.player;
    return(
      <View>
        <View style={styles.cell}>
          <PlayerView
            name={player.name}
            role={player.role}
          />
          <TouchableHighlight onPress={()=> this.props.onPressRoleButton('evil', player, this.props.rowID)}>
            <Image
              style={styles.button}
              source={{ uri: "Mafia_circle", isStatic: true }}
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={()=> this.props.onPressRoleButton('good', player, this.props.rowID)}>
            <Image
              style={styles.button}
              source={{ uri: "Innocent_circle", isStatic: true }}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    marginLeft: 20
  },
  cell: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center'
  },
  roleButton: {
    margin: 20
  }
});

module.exports = RoleSelectionCell;
