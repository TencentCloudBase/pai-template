const Koa = require('koa')
const app = new Koa()
const port = 5000

app.use(async ctx => {
  ctx.body = 'Hello World!'
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});