
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

// GET: Redirect the user back to login screen, only access /game by POST
app.get('/game', function(req, res){
  res.redirect('/');
});

app.post('/game', function(req, res){
  
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
    sys.puts('Fetched my new doc from couch:');
    sys.puts(doc);
  });    
});

// Only listen on $ node app.js
if (!module.parent) app.listen(3000);


/* Chat Socket Server */ 
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

/* Arena Queue Server */

