const koa = require('koa');
const Router = require('koa-router');
// const views = require('koa-views');
const render = require('koa-art-template');
// const common = require('./module/common.js')
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path')
const session = require('koa-session');
const app = new koa();
const router = new Router();
app.use(bodyParser());
app.use(static(__dirname + '/static'))  //可配置多个静态托管

// app.use(views(__dirname + '/views', {
//   map: {
//     html: 'ejs'
//   }
// }));


render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.art',
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
  // await ctx.render('index')
  await ctx.render('index')
  ctx.session.userinfo = 'root';
  console.log(ctx.session.userinfo)
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

class Db {
  constructor(){
    console.log('实例化会执行构造函数')
    this.connect();
  }

  static getInstance(){  //节省性能,只实例化一次
    if (!Db.instance) {
      Db.instance= new Db();
    }
    return Db.instance;
  }

  connect(){
    console.log('链接数据库')
  }

  find(){
    console.log('查询数据库')
  }
}

const myDb = Db.getInstance();
const myDb2 = Db.getInstance();
const myDb3 = Db.getInstance();

myDb.find();
myDb2.find();
myDb3.find();


app.use(router.routes())
  .use(router.allowedMethods()).listen(8888);