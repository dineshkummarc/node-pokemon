var http = require('http');
var io = require('socket.io');

var queue = exports;

queue.init = function() {
  return function() {
    
    arenaQueueServer = http.createServer(function(req, res){});
    arenaQueueServer.listen(3002);
    io = io.listen(arenaQueueServer);
    io.on('connection', function(client) {});

      setInterval(function() {
        var clientList = io.clients;
        var players = [];
        var clientCount = 0;

        clientList.forEach(function(client) { 
          clientCount++;
          players.push(client);
        });

        if(clientCount > 1) {
          console.log("Matching players...");
          var rejectedList = []; //store clients that you don't want to publish messages to
                                //so that they don't all enter into a game instnace at once.
                                //only the players that were chosen!

          //this is where you would implement more robust match making algorithm (delegate this)
          var player1index = Math.random(0, players.length - 1);
          var player2index = Math.random(0, players.length - 1);

          //TODO: add to the rejectedList so that we can filter out who gets the broadcast or not
          //code goes here

          //TODO: broadcast to the specific clients that were chosen
          //io.broadcast([players[player1index], players[player2index]], rejectedList);

          console.log("-----------");
          clientList.forEach(function(client) {
            console.log("id: " + client.sessionId);
          });

          //TODO: disconnect the two chosen players from the queue system
          //code goes here
        } else {
         // console.debug("[DEBUG] " + Date.now() + ": Waiting for more players...");
        }
      }, 2000);

  }();
};