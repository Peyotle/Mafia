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
const roles = ['good', 'evil', 'evilMain', 'goodMain'];

class RoleSelectionScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Next', // for a textual button, provide the button title (label)
        id: 'next', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
        disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        showAsAction: 'ifRoom' // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
      }
    ]
  };

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

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'next') { // this is the same id field from the static navigatorButtons definition
        this.onNextButton();
      }
    }
  }

  onNextButton() {
    var allRolesAssigned = true;
    if (!allRolesAssigned){
      AlertIOS.alert('Missing roles', 'Please assign roles to all players');
    } else {
      this.props.navigator.push({
        screen: 'mafia.GameplayScreen',
        title: 'Gameplay',
        passProps: {
          pushEvent: this.state.players
        }
      });
    }
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
          <Button
            style={styles.roleButton}
            onPress={()=> this.pressEvil(rowData, rowID)}
            title="👎"
            color="#841584"
            accessibilityLabel="Make the player evil button"
          />
          <View style={styles.container}>
            <View style={[styles.avatarView, cellStyle]}>
              <Text style={styles.cellText}>{rowData.name}</Text>
            </View>
            <Text style={styles.detailsText}>{rowData.role}</Text>
          </View>

          <Button
            style={styles.roleButton}
            onPress={()=> this.pressGood(rowData, rowID)}
            title="👍"
            color="#841584"
            accessibilityLabel="Make the player good button"
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

module.exports = RoleSelectionScreen;
