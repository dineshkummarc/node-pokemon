/* 
  Class: TappableController
  Author: Jaime Bueza
  
  Reponsible for handling interaction and data retrieval for Hands while in game.
  
*/
dojo.provide("app.controller.card.TappableController");
dojo.declare("app.controller.card.TappableController", mojo.controller.Controller,{
  addObservers: function() {
    this.addObserver(this.getContextElement(), "onclick", "CSS", function(context, caller) {
      return {
        element: caller,
        action: "toggle",
        cssClass: "tapped"
      };
    });
    this.addObserver(this.getContextElement(), "onclick", "Play", { audio: mojo.queryFirst("#sound-headshot")});
    
  },
  addCommands: function() {
    this.addCommand("Messaging", "stdlib.behavior.MessagingBehavior");
    this.addCommand("CSS", "stdlib.behavior.UpdateCssClassBehavior");
    this.addCommand("Play", "stdlib.behavior.PlaySoundBehavior");
    
  },
  addIntercepts: function() {

  }
});