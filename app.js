const koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const path = require('path');
const static = require('koa-static');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

const app = new koa();
const router = new Router();

// 模板
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
app.use(static(__dirname + '/public'))  //可配置多个静态托管

const CONFIG = {
  key: 'session', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: false, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));
app.use(bodyParser());

router.use('/admin',require('./routes/admin'))
router.use('/api',require('./routes/api'))
router.use(require('./routes/index'))

app.use(router.routes()).use(router.allowedMethods()).listen(3006);