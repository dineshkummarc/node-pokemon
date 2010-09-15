
/**
 * Module dependencies.
 */
 
var http = require('http');
var url = require('url');
var fs = require('fs');
var sys = require('sys');
var express = require('express');
var connect = require('connect');
var io = require('socket.io');
var couchdb = require('couchdb'),
    client = couchdb.createClient(5984, 'localhost'),
    db = client.db('cards');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use(connect.bodyDecoder());
    app.use(connect.methodOverride());
    app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(connect.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(connect.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
   app.use(connect.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  
    res.render('login.ejs', {
      locals: {
        page: {
          title: "Concept : Pokemon HTML5/CSS3/NodeJS Game : please login"
          
        }
      }
    });
});

app.get('/game', function(req, res){
  
    res.render('game.ejs', {
      locals: {
        page: {
          title: "POKEMON HTML5/JS/CSS/NODEJS EXAMPLE"
        }
      }
    });
});


app.get('/testdb', function(req, res) {
  
  
  db.getDoc('hellothere', function(er, doc) {
//    if (er) throw new Error(JSON.stringify(er));
    sys.puts('Fetched my new doc from couch:');
    sys.puts(doc);
    
    
    console.log("hello!");
  });
    
    
});




// Only listen on $ node app.js
if (!module.parent) app.listen(3000);


/* Socket Server */ 
server = http.createServer(function(req, res){});
server.listen(3001);
io = io.listen(server);
var buffer = [];

io.on('connection', function(client){
  client.send({ buffer: buffer });
  client.broadcast({ announcement: client.sessionId + ' connected' });

  client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    buffer.push(msg);
    if (buffer.length > 15) buffer.shift();
    client.broadcast(msg);
  });

  client.on('disconnect', function(){
    client.broadcast({ announcement: client.sessionId + ' disconnected' });
  });
});

