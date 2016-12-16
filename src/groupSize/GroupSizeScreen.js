'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  StatusBar,
  Image,
  Animated,
} from 'react-native';

var globalStyles = require('../styles');
var FlatButton = require('../UIComponents/FlatButton');

class TitleView extends Component {
  constructor(props) {
    super(props);
    this.state={
      animValue: new Animated.Value(0)
    }
  }

  render() {
    let viewStyle = [styles.titleImage, {marginTop: this.state.animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 50], }), opacity: this.state.animValue}]
    return(
      <View style={styles.titleContainer}>
        <Animated.Image
          style={viewStyle}
          source={{ uri: "Mask_welcome_page", isStatic: true }}
          resizeMode='center'
        />
        <Animated.Text style={[styles.title, {marginTop: this.state.animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 20] })}]}>
          Select the number of players
        </Animated.Text>
      </View>
    );
  }

  componentDidMount() {
    this.animateTitleImage();
  }

  animateTitleImage() {
    Animated.timing(
      this.state.animValue,
      {toValue: 1,
      duration: 1000 }
    ).start();
  }
}

class GroupSizeScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      players: 4
    }
  }

  render() {
    const minNumberOfPlayers = 4;
    const maxNumberOfPlayers = 12;
    var pickerItems = [];
    for (var i = minNumberOfPlayers; i <= maxNumberOfPlayers; i++) {
      pickerItems[i] = <Picker.Item
        label={String(i)}
        value={i}
        key={String(i)}
      />
    }
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TitleView />
        <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.players}
            onValueChange={(players) => this.setState({players: players})}>
            {pickerItems}
        </Picker>
        <FlatButton title='Get Started' onPress={this.onNextButton.bind(this)} />
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
    transform: [{scale: 1.5}],
    marginTop: 40
  },
  pickerItem: {
     fontSize: 20,
     height: 200,
     margin: 20,
     color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#001',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 80,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 40,
    justifyContent: 'center'
  },
  titleImage: {
    width: 194,
    height: 44,
    margin: 10
  }
});

module.exports = GroupSizeScreen;
