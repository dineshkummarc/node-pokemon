/* 
  Class: BattlegroundController
  Author: Jaime Bueza
  
  Reponsible for handling interaction and data retrieval for Hands while in game.
  
*/
dojo.provide("app.controller.battleground.BattlegroundController");
dojo.declare("app.controller.battleground.BattlegroundController", mojo.controller.Controller,{
  addObservers: function() {
  },
  addCommands: function() {
    this.addCommand("Messaging", "stdlib.behavior.MessagingBehavior");
    this.addCommand("CSS", "stdlib.behavior.UpdateCssClassBehavior");
    
  },
  addIntercepts: function() {

  }
});