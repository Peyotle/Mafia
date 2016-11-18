'use strict';

class Player {

  constructor(name, role, isAlive=true) {
    this.name = name;
    this.role = role;
    this.isAlive = isAlive;
  }
}

module.exports = Player;
