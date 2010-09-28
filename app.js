//npm based
var http = require('http');
var express = require('express');
var connect = require('connect');
var io = require('socket.io');

//custom libraries
var achievement = require('./lib/achievement');
var chat = require('./lib/chat');
var queue = require('./lib/queue');


var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(connect.bodyDecoder());
    app.use(connect.methodOverride());
    app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(connect.staticProvider(__dirname + '/public'));
});

// Routes
app.get('/', function(req, res){
    res.render('login', {
      locals: {
        page: {
          title: "Concept : Pokemon HTML5/CSS3/NodeJS Game : please login"
          
        }
      }
    });
});
app.get('/game', function(req, res){
    res.render('game', {
      locals: {
        page: {
          title: "POKEMON HTML5/JS/CSS/NODEJS EXAMPLE"
        }
      }
    });
});

app.get('/dialog/achievements', achievement.index);



//JSON web services
app.get('/user/achievements', achievement.list);
app.post('/user/achievements', achievement.save);


// Only listen on $ node app.js
if (!module.parent) app.listen(3000);


/* Chat Socket Server */ 
chat.init();
/* Arena Queue Server */
queue.init();