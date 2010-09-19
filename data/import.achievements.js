var couchdb = require('couchdb'),
    client = couchdb.createClient();

//drop database
client.request('delete', '/achievements');

//create database
client.request('put', '/achievements');

//setup views
client.db('achievements').saveDesign('achievement', {
  views: {
    all: {
      map: function(doc) {
        emit(null, doc);
      }
    }
  }
});

(function(client) {
  var data = [
    { 'name': "Pokemon Master", 'category': "Player vs Player", 'description': "Win 10 Pokemon Arena Games", 'worth': 10 },
    { 'name': "Pokemon Champion", 'category': "Player vs Player", 'description': "Win 100 Pokemon Arena Games", 'worth': 100 },
    { 'name': "Pokemon Gladiator", 'category': "Player vs Player", 'description': "Earn the Gladiator title from Season 1 by being in the top 0.5 percent.", 'worth': 1000 }
  ];
  
  data.forEach(function(row) {
    client.request('post', '/achievements', row);
  });
})(client);
