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
  StyleSheet
} from 'react-native';

var Player = require('./Player.js');
const roles = ['good', 'evil', 'evilMain', 'goodMain'];

class RoleSelection extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    var numberOfPlayers = props.pushEvent;
    var listItems = [];

    for (var i = 0; i < numberOfPlayers; i++) {
      var player = new Player(i + 1, "none");
      listItems.push(player);
    }

    this.state = {
      dataSource: ds.cloneWithRows(listItems),
      pushEvent: props.pushEvent,
      players: listItems
    };
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
    var cellStyle = this.cellStyle(rowData.role);

    return (
      <TouchableHighlight
        onPress={()=> this.pressRow(rowData, rowID)}
        underlayColor='#ddd'>

        <View style={styles.cell}>
          <View style={[styles.avatarView, cellStyle]}>
            <Text style={styles.cellText}>{rowData.name}</Text>
          </View>

          <Button
            style={styles.roleButton}
            onPress={()=> this.pressGood(rowData, rowID)}
            title="Good"
            color="#841584"
            accessibilityLabel="Make the player good button"
          />
          <Button
            style={styles.roleButton}
            onPress={()=> this.pressEvil(rowData, rowID)}
            title="Evil"
            color="#841584"
            accessibilityLabel="Make the player evil button"
          />

        </View>
      </TouchableHighlight>
    );
  }

  pressGood(rowData, rowID) {
    var player: Player = rowData;
    var role = player.role;

    role = (role == 'good') ? 'goodMain' : 'good';
    var updatedPlayer = new Player(player.name, role);

    var newDs = this.state.players.slice();

    newDs[rowID] = updatedPlayer;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      players: newDs
    });
  }

  pressEvil(rowData, rowID) {
    var player: Player = rowData;
    var role = player.role;

    role = (role == 'evil') ? 'evilMain' : 'evil';
    var updatedPlayer = new Player(player.name, role);

    var newDs = this.state.players.slice();

    newDs[rowID] = updatedPlayer;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      players: newDs
    });
  }

  pressRow(rowData, rowID) {
    var player: Player = rowData;
    var role = player.role;

    var nextRole = this.nextRole(role);
    var updatedPlayer = new Player(player.name, nextRole);

    var newDs = this.state.players.slice();

    newDs[rowID] = updatedPlayer;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      players: newDs
    })
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    padding: 10,
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
  cellText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

module.exports = RoleSelection;
