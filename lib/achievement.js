/* 
  Class: Achievement
  Author: Jaime Bueza
  Description: CRUD Achievement
*/
var couchdb = require('couchdb');
var client = couchdb.createClient();
var achievement = exports;

var db = client.db('achievements');


achievement.index = function(request, response) {
  db.view('achievement', 'all', {}, function(err, data) {
    if(err) throw new Error(err);    
    data = data.rows;
    var achievements = [];
    data.forEach(function(item) {
      var obj = {};
      obj['name'] = item.value.name;
      obj['description'] = item.value.description;
      obj['worth'] = item.value.worth;
      achievements.push(obj);
    });  
    response.render('achievements', {
       layout: false,
       locals: {
         achievements: achievements,
         
         page: {
          title: "LOLWAT"
         }
       }
     });
  
     
  });
};



//crud: api call for listing
achievement.list = function(request, response) {    
  db.view('achievement', 'all', {}, function(err, data) {
    if(err) throw new Error(err);
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(data));
  });
};


//crud: api call save
achievement.save = function(request, response) {
  
};

//crud: update
achievement.update = function(request, response) {
  
};