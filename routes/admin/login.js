const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('admin/login')
})

module.exports = router.routes();  //暴露并且启动路由