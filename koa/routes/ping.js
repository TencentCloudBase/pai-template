const ping = require("koa-router")();
const fs = require("fs");
const pt = require("path");

ping.get("/ping", ctx => {
  ctx.response.type = "html";
  ctx.response.body = fs.createReadStream(
    pt.join(__dirname, "../views/ping.html")
  );
});

module.exports = ping;
