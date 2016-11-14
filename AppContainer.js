'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

var GroupSizeSelector = require('./GroupSizeSelector');

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <NavigatorIOS
        style={{
          flex: 1
        }}
        initialRoute={{
          component: GroupSizeSelector,
          title: 'GroupSizeSelector'
        }}
      />

      // <View>
      //   <Text style={styles.title}>
      //     Select the number of players
      //   </Text>
      //
      //   <GroupSizeSelector />
      // </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  }
});

module.exports = AppContainer;
