/* 
  Class: HandController
  Author: Jaime Bueza
  
  Reponsible for handling interaction and data retrieval for Hands while in game.
  
*/
dojo.provide("app.controller.player.HandController");
dojo.declare("app.controller.player.HandController", mojo.controller.Controller,{
  addObservers: function() {
    this.addObserver(".hand-cards > li > .card", "onclick", "CSS", function(context, caller) {
      //dojo.query(".h > li", context).removeClass('active');
      return {
        element: caller,
        action: "toggle",
        cssClass: "flip"
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