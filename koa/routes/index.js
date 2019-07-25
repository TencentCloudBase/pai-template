const router = require("koa-router")();
const helloworld = require("./helloworld");
const ping = require("./ping");

router.use(helloworld.routes());
router.use(ping.routes());

module.exports = router;
