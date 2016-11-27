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

var Player = require('../Player.js');

var PlayerGameplayCell  = require('./PlayerGameplayCell');

class GameplayListView extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.players),
    };
  }

  render() {
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return(
        <PlayerGameplayCell
          rowData={rowData}
          rowID={rowID}
          onKill={this.pressKill.bind(this)} />
    );
  }

  pressKill(rowData, rowID) {
    var player: Player = rowData;

    var updatedPlayer = new Player(player.name, player.role, !player.isAlive);
    var newDatasource = this.props.players.slice();

    newDatasource[rowID] = updatedPlayer;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDatasource),
    });
    console.log("List players: " + newDatasource);
    // var onKill = ;
    this.props.updatePlayers(newDatasource, this.props.onKill);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cellText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  detailsText: {
    fontSize: 10,
    color: '#bbb'
  }
});

module.exports = GameplayListView;
