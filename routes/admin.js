const Router = require('koa-router');

const router = new Router();

// 配置中间件,获取url地址
router.use(async (ctx,next) => {
  //配置模板引擎的全局变量
  ctx.state.__HOST__ = `http://${ctx.request.header.host}`;
  // 匹配到中间件往下走
  await next();
})

router.get('/', (ctx) => {
  ctx.body = '接口'
})

router.use('/login', require('./admin/login'))
router.use('/user', require('./admin/user'))

module.exports = router.routes();  //暴露并且启动路由