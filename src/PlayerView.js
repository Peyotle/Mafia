'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated
} from 'react-native';

class PlayerView extends Component {
  render() {
    var roleImage = this.props.hideInfo ? "None_big_ic" : this.roleImage(this.props.role);
    var roleName = this.props.hideInfo ? 'Hidden' : this.roleName(this.props.role);
    return (
      <View style={styles.container}>
        <PlayerRoleImage style={styles.avatarView} roleImage={roleImage} />
        <Text style={styles.cellText}>{this.props.name}</Text>
        <Text style={styles.detailsText}>{roleName}</Text>
      </View>
    );
  }

  roleImage(role: String) {
    switch (role) {
      case 'none':
      return "None_big_ic";
      break;
      case 'good':
      return "Innocent_big_ic";
      break;
      case 'evil':
      return "Mafia_big_ic";
      break;
      case 'evilMain':
      return "Don_big_ic";
      break;
      case 'goodMain':
      return "Sheriff_big_ic";
      break;
      default:
      return "None_big_ic";
    }
  }

  roleName(role: String) {
    switch (role) {
      case 'none':
      return "None";
      break;
      case 'good':
      return "Innocent";
      break;
      case 'evil':
      return "Mafia";
      break;
      case 'evilMain':
      return "Don";
      break;
      case 'goodMain':
      return "Detective";
      break;
      default:
      return "None_big_ic";
    }
  }
}

class PlayerRoleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1),
    };
  }

  render() {
    return(
      <View style={this.props.style}>
        <Animated.Image
          source={{ uri: this.props.roleImage, isStatic: true }}
          style={[this.props.style,
            {transform: [  // `transform` is an ordered array
              {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
            ]}
          ]}
        />
      </View>
    );
  }

  componentDidUpdate() {
    this.state.bounceValue.setValue(1.2);  // Start large
    Animated.spring(  // Base: spring, decay, timing
      this.state.bounceValue,  // Animate `bounceValue`
      {
        toValue: 1,  // Animate to smaller size
        friction: 5,  // Bouncier spring
        tension: 10,
      } ).start();  // Start the animation
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    avatarView: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10
    },
    cellText: {
      fontSize: 30,
      marginLeft: 20,
      textAlign: 'center',
      color: '#ddd'
    },
    detailsText: {
      fontSize: 10,
      color: '#bbb',
      margin: 20
    }
  });

  module.exports = PlayerView;
