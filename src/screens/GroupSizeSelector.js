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

// var RoleSelectionScreen = require('./RoleSelectionScreen.js');
// import {registerScreens} from ".";
// registerScreens();


class GroupSizeSelector extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    var listItems = [8, 9, 10];

    this.state = {
      dataSource: ds.cloneWithRows(listItems)
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.imageContainer}>

          <Text style={styles.title}>
            Select the number of players
          </Text>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={()=> this.pressRow(rowData)}
        underlayColor='#ddd'>

        <View style={styles.cell}>
          <Text>{rowData}</Text>
        </View>

      </TouchableHighlight>
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
  logo: {
    width: 100,
    height: 150,
    margin: 20,
    marginTop: 80
  },
  title: {
    fontSize: 20
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  }
});

module.exports = GroupSizeSelector;
