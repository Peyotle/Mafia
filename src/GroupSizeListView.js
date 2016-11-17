'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class GroupSizeListView extends Component {
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={()=> this.props.pressRow(rowData)}
        underlayColor='#ddd'>

        <View style={styles.cell}>
          <Text>{rowData}</Text>
        </View>

      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
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

module.exports = GroupSizeListView;
