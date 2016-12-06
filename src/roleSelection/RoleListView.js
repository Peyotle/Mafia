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

const roles = ['good', 'evil', 'evilMain', 'goodMain'];
var Player = require('../Player');
var PlayerView = require('../PlayerView');
var globalStyles = require('../styles');
var RoleSelectionCell = require('./RoleSelectionCell');

class RoleListView extends Component {
  constructor(props) {
    super(props);
    this.state= {
      dataSource: this.props.dataSource,
      players: this.props.players
    }
  }

  render() {
    return(
      <ListView
        style = {[styles.listView, globalStyles.mainBackground]}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={{marginTop: 60, overflow: 'visible'}}
        initialListSize={1}
        renderSeparator={this.renderSeparator}
      />
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <RoleSelectionCell
        player={rowData}
        nextRole={this.nextRole(rowData.role)}
        rowID={rowID}
        onPressRoleButton={this.onPressRoleButton.bind(this)} />
    );
  }

  onPressRoleButton(buttonID, rowData, rowID) {
    var player: Player = rowData;
    var role = player.role;

    if (buttonID == 'good'){
      role = (role == 'good') ? 'goodMain' : 'good';
    }else{
      role = (role == 'evil') ? 'evilMain' : 'evil';
    }

    var updatedPlayer = new Player(player.name, role);
    var newDs = this.state.players.slice();
    newDs[rowID] = updatedPlayer;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      players: newDs
    });
    this.props.setPlayers(newDs)
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return(
      <View key={`${sectionID}-${rowID}`} style={styles.separator}></View>
    );
  }

  nextRole(role: String) {
    var roleIndex = roles.indexOf(role);
    if (roleIndex < roles.length - 1) {
      return roles[roleIndex + 1];
    }
    return roles[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#225',
    marginLeft: 20
  },
});

module.exports = RoleListView;
