const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = '接口'
})

router.get('/add', (ctx) => {
  ctx.body = '增加接口'
})


module.exports = router.routes();  //暴露并且启动路由