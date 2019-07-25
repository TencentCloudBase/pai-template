const path = require("path");

module.exports = {
  root: path.resolve("./src"),
  socket: true,
  routes: [
    {
      path: "static",
      type: "static"
    },
    {
      path: "index.js",
      route: "/"
    },
    {
      path: "ping.js",
      template: "template/ping.html",
      route: "/ping",
      method: "get"
    },
    {
      path: "ws.js",
      type: "websocket",
      route: "/ws"
    }
  ]
};
