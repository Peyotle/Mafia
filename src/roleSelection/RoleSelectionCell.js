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
    const roleImage = this.roleButtonImage(this.props.nextRole);
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
              source={{ uri: roleImage, isStatic: true }}
            />
          </TouchableHighlight>

          
        </View>
      </View>
    );
  }

  roleButtonImage(role) {
    switch (role) {
      case 'none':
      return "innocent_ic";
        break;
      case 'good':
      return "mafia_ic";
        break;
      case 'evil':
      return "don_ic";
        break;
      case 'evilMain':
      return "sheriff_ic";
        break;
      case 'goodMain':
      return "innocent_ic";
        break;
      default:
      return "None_big_ic";
    }
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
