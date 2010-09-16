/* 
  Class: LoginController
  Author: Jaime Bueza
  
  Reponsible for handling interaction and authentication for users.
  
*/
dojo.provide("app.controller.member.LoginController");
dojo.declare("app.controller.member.LoginController", mojo.controller.Controller,{
  addObservers: function() {
    this.addObserver(".users > li", "onclick", "CSS", function(context, caller) {
      dojo.query(".users > li", context).removeClass('active');
      return {
        element: caller,
        action: "toggle",
        cssClass: "active"
      };
    });
    
    this.addObserver(".users > li", "onclick", "Play", { audio: mojo.queryFirst("#sound-dominating") });
    this.addObserver("#btn-enter-world", "onclick", "Play", { audio: mojo.queryFirst("#sound-headshot") });
  },
  addCommands: function() {
    this.addCommand("Messaging", "stdlib.behavior.MessagingBehavior");
    this.addCommand("CSS", "stdlib.behavior.UpdateCssClassBehavior");
    this.addCommand("Play", "stdlib.behavior.PlaySoundBehavior");
    
  },
  addIntercepts: function() {

  }
});