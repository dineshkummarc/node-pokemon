var arena = exports;

/* Spawns a game instance for two players*/
arena.create = function(players) {
  
};

//Responsible for updating win/loss ratio for each player base don the outcome
//of the battle arena
/*
arena.prototype.report = function(request, response) {};
//unlock controls for specific player
arena.prototype.nextTurn = function(request, response) {};
*/


arena.index = function(request, response) {
  return function() {
    console.log("o hai, u have reached the arena dialog lol wat up bro");
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('LOL ARENA QUEUE\n');
     
     
  }();
 
};