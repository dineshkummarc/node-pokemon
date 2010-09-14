/* 
  Class: FriendsController
  Author: Jaime Bueza
  
  Reponsible for handling interaction and authentication for users.
  
*/
dojo.provide("app.controller.member.FriendsController");
dojo.declare("app.controller.member.FriendsController", mojo.controller.Controller,{
  addObservers: function() {
  
    this.addObserver(mojo.queryFirst("#btn-friends"), "onclick", "CSS", function(context, caller) {
      console.log("wat");
      return {
        element: context,
        action: "toggle",
        cssClass: "active"
      };
    });
  },
  addCommands: function() {
    this.addCommand("Messaging", "stdlib.behavior.MessagingBehavior");
    this.addCommand("CSS", "stdlib.behavior.UpdateCssClassBehavior");
    
  },
  addIntercepts: function() {

  }
});