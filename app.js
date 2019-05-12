const koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path')
const session = require('koa-session');
const admin = require('./routes/admin');  //引入路由子模块
const api = require('./routes/api');  //引入路由子模块
const index = require('./routes/index');  //引入路由子模块
const app = new koa();
const router = new Router();
app.use(bodyParser());
app.use(static(__dirname + '/static'))  //可配置多个静态托管

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

app.keys = ['some secret hurr'];  // cookie的签名

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));
router.use('/admin',admin)
router.use('/api',api)
router.use(index)


app.use(async (ctx, next) => {
  ctx.session.userinfo = 'hqzh'
  ctx.state.useinfo = ctx.session.userinfo  //设置ejs全局属性
  await next();
  if (ctx.status === 404) {
    ctx.body = '404'
  }
})


app.use(router.routes())
  .use(router.allowedMethods()).listen(8888);