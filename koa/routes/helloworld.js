const helloworld = require("koa-router")();

helloworld.get("/", ctx => {
  ctx.response.type = "html";
  ctx.response.body = "Hello World!";
});

module.exports = helloworld;
