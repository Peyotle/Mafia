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
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.players),
    };
  }

  render() {
    return(
      <ListView
        style = {globalStyles.mainBackground}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this.renderSeparator}
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

  pressKill(rowData, rowID) {
    var player: Player = rowData;

    var updatedPlayer = new Player(player.name, player.role, !player.isAlive);
    var newDatasource = this.props.players.slice();

    newDatasource[rowID] = updatedPlayer;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDatasource),
    });
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
  },
  separator: {
    height: 0.5,
    backgroundColor: '#225',
    marginLeft: 20
  },
});

module.exports = GameplayListView;
