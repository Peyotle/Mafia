'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ListView,
  Image,
  Button,
  TouchableHighlight,
  StyleSheet,
  AlertIOS
} from 'react-native';

var Player = require('../Player.js');
var PlayerView = require('../PlayerView');

class GameplayScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Hide Info',
        id: 'info',
        disabled: false,
        disableIconTint: true
      }
    ]
  };

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.pushEvent),
      players: props.pushEvent,
      showInfo: true
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'info') {
        this.onInfoButton();
      }
    }
  }

  onInfoButton() {
    console.log(this.state.showInfo);
    this.state.showInfo = !this.state.showInfo;
    this.updateCellsDisplay();
  }

  updateCellsDisplay() {
    var newPlayers = [];
    var updatedPlayer;
    var newDs = this.state.players.slice();

    for (var player of this.state.players) {
      updatedPlayer = new Player(player.name, player.role);
      var rowID = this.state.players.indexOf(player);
      newDs[rowID] = updatedPlayer;
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      players: newDs
    });
  }

  componentDidMount(){

  }

  render() {
    return(
      <ListView
        style = {styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }

  cellStyle(role: String) {
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

  renderRow(rowData, sectionID, rowID) {
    console.log(this.state.showInfo);
    var cellStyle = this.cellStyle(rowData.role);
    return(
      <PlayerGameplayCell rowData={rowData} rowID={rowID} cellStyle={cellStyle} onKill={this.pressKill.bind(this)} />
    )
    // if (this.state.showInfo) {
    //   return this.detailedCell(rowData, cellStyle);
    // } else {
    //   return this.minimalCell(rowData, cellStyle);
    // }
  }

  pressKill(rowData, rowID) {
    var player: Player = rowData;

    var updatedPlayer = new Player(player.name, player.role, !player.isAlive);
    var newDs = this.state.players.slice();

    newDs[rowID] = updatedPlayer;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      players: newDs
    });
  }
}

class PlayerGameplayCell extends Component {
  render() {
    var buttonTitle;
    var cellStyle;
    if (this.props.rowData.isAlive) {
      buttonTitle = 'Kill';
      cellStyle = styles.cellAlive;
    } else {
      buttonTitle = 'Revive';
      cellStyle = styles.cellDead;
    }
    return (
      <View style={[styles.cell, cellStyle]}>
      <PlayerView name={this.props.rowData.name} role={this.props.rowData.role} cellStyle={this.props.cellStyle} />

        <Button
          style={styles.roleButton}
          onPress={()=> this.props.onKill(this.props.rowData, this.props.rowID)}
          title={buttonTitle}
          color="#841584"
          accessibilityLabel="Kill the player"
        />
      </View>
    )
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
  cellAlive: {
    backgroundColor: '#fff'
  },
  cellDead: {
    backgroundColor: '#ddd'
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

module.exports = GameplayScreen;
