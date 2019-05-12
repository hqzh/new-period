const Router = require('koa-router');
const user = require('./admin/user');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = '后台'
})

router.use('/user',user)

module.exports = router.routes();  //暴露并且启动路由