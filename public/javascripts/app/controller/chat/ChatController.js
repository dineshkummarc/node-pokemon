/* 
  Class: ChatController
  Author: Jaime Bueza
  
  Reponsible for handling interaction and data retrieval for Hands while in game.
  
*/


/*
var socket = new io.Socket("localhost", { rememberTransport: false, port: 3000 }); 
socket.connect();
socket.send("wat");
socket.send("wat");

socket.send("wat");
socket.send("wat");
socket.send("wat");
socket.send("wat");

socket.on('connect', function(){
 console.log("CLIENT: WEBSOCKETS CONNECTED TO NODEJS");
});
socket.on('message', function(obj){ 

  if(obj['buffer']) {
    console.log(obj);
  } else {
    console.log(obj.buffer);
  }

});
socket.on('disconnect', function(){
 console.log("CLIENT: DISCONNECT");
 
});        
*/
function message(obj){
  var el = document.createElement('p');
  if ('announcement' in obj) el.innerHTML = '<em>' + esc(obj.announcement) + '</em>';
  else if ('message' in obj) el.innerHTML = '<b>' + esc(obj.message[0]) + ':</b> ' + esc(obj.message[1]);
  document.getElementById('chat').appendChild(el);
  document.getElementById('chat').scrollTop = 1000000;
}

function send(){
  var val = document.getElementById('text').value;
  socket.send(val);
  message({ message: ['you', val] });
  document.getElementById('text').value = '';
}

function esc(msg){
  return msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var socket = new io.Socket("localhost", {port: 3001});
socket.connect();
socket.on('message', function(obj){
  if ('buffer' in obj){
    document.getElementById('form').style.display='block';
    document.getElementById('chat').innerHTML = '';
    
    for (var i in obj.buffer) message(obj.buffer[i]);
  } else message(obj);
});




dojo.provide("app.controller.chat.ChatController");
dojo.declare("app.controller.chat.ChatController", mojo.controller.Controller,{
  addObservers: function() {
    /*
    this.addObserver(".hand-cards > li > .card", "onclick", "CSS", function(context, caller) {
      return {
        element: caller,
        action: "toggle",
        cssClass: "flip"
      };
    });*/
    
    
  },
  addCommands: function() {
    this.addCommand("Messaging", "stdlib.behavior.MessagingBehavior");
    this.addCommand("CSS", "stdlib.behavior.UpdateCssClassBehavior");
    
  },
  addIntercepts: function() {

  }
});