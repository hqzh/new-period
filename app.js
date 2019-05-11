const koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
// const common = require('./module/common.js')
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const app = new koa();
const router = new Router();
app.use(bodyParser());
app.use(static(__dirname + '/static'))  //可配置多个静态托管

app.use(views(__dirname + '/views', {
  map: {
    html: 'ejs'
  }
}));

router.get('/', async (ctx, next) => {
  await ctx.render('index')
});

router.post('/doAdd', async (ctx, next) => {
  // const data = await common.getPostData(ctx)
  // console.log(data)
  console.log(ctx.request.body)
});

router.get('/news', (ctx, next) => {
  ctx.body = 'news!';
});

router.get('/newscontent/:aid', (ctx, next) => {
  ctx.body = ctx.params.aid;
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