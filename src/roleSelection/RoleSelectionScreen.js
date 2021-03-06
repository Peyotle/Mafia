'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  AlertIOS
} from 'react-native';
import EffectsView from 'react-native-effects-view';

var Player = require('../Player.js');
var RoleListView = require('./RoleListView');
var globalStyles = require('../styles');
var FlatButton = require('../UIComponents/FlatButton');


class RoleSelectionScreen extends Component {

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    var numberOfPlayers = props.pushEvent;
    var listItems = [];

    for (var i = 0; i < numberOfPlayers; i++) {
      var player = new Player(i + 1, "none", true);
      listItems.push(player);
    }

    this.state = {
      dataSource: ds.cloneWithRows(listItems),
      pushEvent: props.pushEvent,
      players: listItems
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'next') {
        this.onNextButton();
      }
    }
  }

  onNextButton() {
    var noRolePlayers = this.state.players.filter(player => player.role == 'none').length;

    if (noRolePlayers > 0){
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
      <View
        style={[{flex: 1}, globalStyles.mainBackground]}>
          <RoleListView
            dataSource={this.state.dataSource}
            players={this.state.players}
            setPlayers={this.setPlayers.bind(this)}
          />
          <View style={styles.bottomView}>
            <EffectsView
                  blurStyle="dark"
                   style={{position: 'absolute', height: 80, bottom: 0, left: 0, right: 0}}
                  >
              </EffectsView>
            <FlatButton title='Start Game' onPress={this.onNextButton.bind(this)} />

          </View>

      </View>
    );
  }

  setPlayers(players) {
    this.setState ({
      players: players
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomView: {
    height: 100
  }
});

module.exports = RoleSelectionScreen;
