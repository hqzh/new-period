const koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const static = require('koa-static');

const app = new koa();
const router = new Router();
// 模板
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
app.use(static(__dirname + '/public'))  //可配置多个静态托管

router.use('/admin',require('./routes/admin'))
router.use('/api',require('./routes/api'))
router.use(require('./routes/index'))

app.use(router.routes()).use(router.allowedMethods()).listen(8888);