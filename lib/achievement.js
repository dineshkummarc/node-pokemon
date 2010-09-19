/* 
  Class: Achievement
  Author: Jaime Bueza
  Description: CRUD Achievement
*/
var couchdb = require('couchdb');
var client = couchdb.createClient();
var achievement = exports;

var db = client.db('achievements');

//crud: list
achievement.list = function(request, response) {  
  db.view('achievement', 'all', {}, function(err, data) {
    if(err) throw new Error(err);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
  });
};


//crud: save
achievement.save = function(request, response) {
  
};

//crud: update
achievement.update = function(request, response) {
  
};