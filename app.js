const koa = require('koa');
const Router = require('koa-router');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path')
const session = require('koa-session');
const DB = require('./module/db.js')
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



router.get('/', async (ctx, next) => {
  const data = await DB.find('koa', {})
  await ctx.render('index', { data })
});

router.get('/add', async (ctx, next) => {

  await ctx.render('add')
});

router.get('/edit', async (ctx, next) => {
  const result = await DB.find('koa', { "_id": DB.getObjectId(ctx.query.id) })
  await ctx.render('edit', { data: result[0] })
});

router.get('/delete', async (ctx, next) => {
  const data = await DB.remove('koa', { "_id": DB.getObjectId(ctx.query.id) })
  try {
    if (data.result.ok) {
      ctx.redirect('/')
    }
  } catch (error) {
    console.log(err);
    ctx.redirect('/add')
    return;
  }
});

router.post('/doEdit/:aid', async (ctx, next) => {
  const preData = await DB.find('koa', { "_id": DB.getObjectId(ctx.params.aid) })
  const data = await DB.update('koa', preData[0], ctx.request.body)
  try {
    if (data.result.ok) {
      ctx.redirect('/')
    }
  } catch (error) {
    console.log(err);
    ctx.redirect('/add')
    return;
  }
});

router.post('/doAdd', async (ctx, next) => {
  const data = await DB.insert('koa', ctx.request.body)
  try {
    if (data.result.ok) {
      ctx.redirect('/')
    }
  } catch (error) {
    console.log(err);
    ctx.redirect('/add')
    return;
  }
});

app.use(async (ctx, next) => {
  ctx.state.useinfo = 'hqzh'  //设置ejs全局属性
  await next();
  if (ctx.status === 404) {
    ctx.body = '404'
  }
})


app.use(router.routes())
  .use(router.allowedMethods()).listen(8888);