const Router = require('koa-router');
const DB = require('../module/db');
const router = new Router();

router.get('/', async (ctx, next) => {
  const data = await DB.find('koa', {})
  await ctx.render('index/index', { data })
});

router.get('/add', async (ctx, next) => {

  await ctx.render('index/add')
});

router.get('/edit', async (ctx, next) => {
  const result = await DB.find('koa', { "_id": DB.getObjectId(ctx.query.id) })
  await ctx.render('index/edit', { data: result[0] })
});

router.get('/delete', async (ctx, next) => {
  const data = await DB.remove('koa', { "_id": DB.getObjectId(ctx.query.id) })
  try {
    if (data.result.ok) {
      ctx.redirect('/')
    }
  } catch (error) {
    console.log(err);
    ctx.redirect('/')
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
    ctx.redirect('/edit')
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

module.exports = router.routes();  //暴露并且启动路由