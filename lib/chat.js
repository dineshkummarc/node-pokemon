var http = require('http');
var io = require('socket.io');

var chat = exports;

chat.init = function() {
  return function() {
    chatServer = http.createServer(function(req, res){});
    chatServer.listen(3001);
    io = io.listen(chatServer);
    var buffer = [];

    io.on('connection', function(client){
      client.send({ buffer: buffer });
      client.on('message', function(message){
        var msg = { message: [client.sessionId, message] };
        buffer.push(msg);
        if (buffer.length > 15) buffer.shift();
        client.broadcast(msg);
      });

      client.on('disconnect', function(){
      });
    });
  }();
};