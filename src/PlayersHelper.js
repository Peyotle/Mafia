'use strict';

var Player = require('./Player');

class PlayersHelper {

  static innocentPlayers(players) {
    return players.filter(player => player.role == 'good' || player.role == 'goodMain');
  }

  static evilPlayers(players){
    return players.filter(player => player.role == 'evil' || player.role == 'evilMain');
  }

  static alivePlayers(players) {
    return players.filter(player => player.isAlive == true);
  }
}

module.exports = PlayersHelper;
