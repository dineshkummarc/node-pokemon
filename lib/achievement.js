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
    //response.writeHead(200, {'Content-Type': 'application/json'});  
  
  
    var achievedata = [
      { 'name': "Pokemon Master", 'category': "Player vs Player", 'description': "Win 10 Pokemon Arena Games", 'worth': 10 },
      { 'name': "Pokemon Champion", 'category': "Player vs Player", 'description': "Win 100 Pokemon Arena Games", 'worth': 100 },
      { 'name': "Pokemon Gladiator", 'category': "Player vs Player", 'description': "Earn the Gladiator title from Season 1 by being in the top 0.5 percent.", 'worth': 1000 }
    ];
    
    
    response.render('achievements', {
       layout: false,
       locals: {
         achievements: achievedata,
         
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