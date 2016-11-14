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


class RoleSelection extends Component {
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
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  }
});

module.exports = RoleSelection;
