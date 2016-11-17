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
var RoleListView = require('../RoleListView');


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

  render() {
    return(
      <RoleListView
        dataSource={this.state.dataSource}
        players={this.state.players}
      />
    );
  }
}

const styles = StyleSheet.create({

});

module.exports = RoleSelectionScreen;
