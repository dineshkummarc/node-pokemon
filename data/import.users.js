var couchdb = require('couchdb'),
    client = couchdb.createClient();

//drop database
client.request('delete', '/users');

//create database
client.request('put', '/users');

//setup views
client.db('users').saveDesign('user', {
  views: {
    all: {
      map: function(doc) {
        emit(null, doc);
      }
    }
  }
});

(function(client) {
  //all passwords are "lolwat"
  var data = [
    { 'username': "jbueza", 'password': "c096629f2f8eaa7c3b428918893b39f8", 'email': "asdf@asdf.com" },
    { 'username': "ash", 'password': "c096629f2f8eaa7c3b428918893b39f8", 'email': "aaa1@asdf.com"},
    { 'username': "pikachu", 'password': "c096629f2f8eaa7c3b428918893b39f8", 'email': "aaa2@asdf.com" }
  ];
  
  data.forEach(function(row) {
    client.request('post', '/users', row);
  });
})(client);
