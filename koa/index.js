const Koa = require("koa");
const app = new Koa();
const port = 5000;
const server = require("http").Server(app.callback());
let socketio = require("socket.io")(server);

const routers = require("./routes/index");
app.use(routers.routes());

let ws = socketio.of("/ws");
ws.on("connect", socket => {
  console.log("connect, socket id: " + socket.id);
  let count = 0;

  socket.on("messagePing", data => {
    count++;
    socket.emit("messagePong", "receive " + count + " ping(s), response pong");
  });

  socket.on("disconnect", () => {
    console.log("disconnect socket id: " + socket.id);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
