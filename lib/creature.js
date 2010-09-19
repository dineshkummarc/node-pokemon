var creature = exports;
creature.list = function(request, response) {
  //lists all creatures by user (use username in session
};


//events for pubsubbing
creature.prototype.onDeath = function() {};
creature.prototype.onAttack = function() {};
creature.prototype.onDamage = function() {};
creature.prototype.onHealthChange = function() {};


//implemntations
creature.prototype.die = function() { };
creature.prototype.attack = function(params) { };
creature.prototype.damage = function(params) { };
creature.prototype.health = function() { };
