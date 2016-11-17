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

var GroupSizeListView = require('../GroupSizeListView');

class GroupSizeSelector extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.title}>
            Select the number of players
          </Text>
        </View>
        <GroupSizeListView
          pressRow={this.pressRow.bind(this)}
        />
      </View>
    );
  }

  pressRow(rowData) {
    this.props.navigator.push({
      screen: 'mafia.RoleSelectionScreen',
      title: 'Roles',
      passProps: {
        pushEvent: rowData
      }
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    flex: 1,
    alignItems:'center'
  },
  title: {
    fontSize: 20
  }
});

module.exports = GroupSizeSelector;
