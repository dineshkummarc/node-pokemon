dojo.provide("app.SiteMap");

app.SiteMap = [
  {
    pattern: "#login",
    controllers: [
      {controller: "app.controller.member.LoginController" }
    ]
  },
  {
    pattern: "#hand",
    controllers: [
      { controller: "app.controller.player.HandController" }
    ]
  },
  {
    pattern: "#chat",
    controllers: [
      { controller: "app.controller.chat.ChatController" }
    ]
    
  }
];