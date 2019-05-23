const Router = require('koa-router');

const router = new Router();
const url = require('url')

// 配置中间件,获取url地址
router.use(async (ctx, next) => {
  //配置模板引擎的全局变量
  ctx.state.__HOST__ = `http://${ctx.request.header.host}`;
  const {pathname} = url.parse(ctx.request.url)  //为了验证码的正常
  if (ctx.session.userinfo) {
    // 匹配到中间件往下走
    await next();
  } else {
    if (pathname === '/admin/login' || pathname === '/admin/login/doLogin' || pathname === '/admin/login/code') {
      await next();
    } else {
      ctx.redirect('/admin/login')
    }
  }
})

router.get('/', async (ctx) => {
  await ctx.render('admin/index')
})

router.use('/login', require('./admin/login'))
router.use('/user', require('./admin/user'))

module.exports = router.routes();  //暴露并且启动路由