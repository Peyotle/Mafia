'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Picker
} from 'react-native';

class GroupSizeSelector extends Component {
  constructor(props) {
    super(props);

    this.state={
      players: 10
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={this.state.players}
          onValueChange={(players) => this.setState({players: players})}>
          <Picker.Item label="7" value={7} />
          <Picker.Item label="8" value={8} />
          <Picker.Item label="9" value={9} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="11" value={11} />
          <Picker.Item label="12" value={12} />
      </Picker>
      <Button
        title="Next"
        onPress={this.onNextButton.bind(this)}>

      </Button>
      </View>
    );
  }

  onNextButton() {
    this.props.navigator.push({
      screen: 'mafia.RoleSelectionScreen',
      title: 'Roles',
      passProps: {
        pushEvent: this.state.players
      }
    });
  }

}

const styles = StyleSheet.create({
  picker: {
    transform: [{scale: 1.5}]
  },
  pickerItem: {
     fontSize: 20,
     height: 500,
     margin: 10
  },
  container: {
    flex: 1
  },
  title: {
    fontSize: 20
  }
});

module.exports = GroupSizeSelector;
