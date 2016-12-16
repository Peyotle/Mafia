'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet
} from 'react-native';

var Player = require('../Player.js');
var PlayerGameplayCell  = require('./PlayerGameplayCell');
var globalStyles = require('../styles');

class GameplayListView extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      // dataSource: ds.cloneWithRows(props.players),
      dataSource: ds.cloneWithRowsAndSections(this.playersMap(this.props.players, this.props.deadPlayers)),
    };
  }

  playersMap(players, deadPlayers) {
    var playersMap = {'players' : players,
                      'deadPlayers' : deadPlayers};
    return playersMap;
  }

  render() {
    return(
      <ListView
        style = {globalStyles.mainBackground}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this.renderSeparator}
        renderSectionHeader={this.renderSectionHeader}
        key={this.props.hideInfo}
      />
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return(
        <PlayerGameplayCell
          rowData={rowData}
          rowID={rowID}
          onKill={this.pressKill.bind(this)}
          hideInfo={this.props.hideInfo} />
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return(
      <View key={`${sectionID}-${rowID}`} style={styles.separator}></View>
    );
  }

  renderSectionHeader(sectionData, category) {
    return (
      <View style={styles.header}>
        <Text style={{fontWeight: "700"}}>{category}</Text>
      </View>
    );
  }

  pressKill(rowData, rowID) {
    var player: Player = rowData;
    var updatedPlayer = new Player(player.name, player.role, !player.isAlive);

    var newPlayers = this.props.players.slice();
    var deadPlayers = this.props.deadPlayers;
    var newDeadPlayers = deadPlayers.slice();

    // var newDatasource = this.playersMap();

    var playerIndex = player.isAlive ? newPlayers.indexOf(player) : newDeadPlayers.indexOf(player);

    if (player.isAlive) {
      newPlayers.splice(playerIndex, 1);
      newDeadPlayers.push(updatedPlayer);
    } else {
      newDeadPlayers.splice(playerIndex, 1);
      newPlayers.push(updatedPlayer);
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.playersMap(newPlayers, newDeadPlayers)),
    });
    this.props.updatePlayers(newPlayers, newDeadPlayers, this.props.onKill);
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
  },
  separator: {
    height: 0.5,
    backgroundColor: '#225',
    marginLeft: 20
  },
  header: {
    flex: 1,
    alignItems: 'center',
    height: 20,
    backgroundColor: '#bbb'
  }
});

module.exports = GameplayListView;
