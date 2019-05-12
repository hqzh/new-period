const Router = require('koa-router');
const tools = require('../../model/tools');
const DB = require('../../modules/db')

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('admin/login')
})

router.post('/doLogin', async (ctx) => {
  const { username, password } = ctx.request.body
  const result =await DB.find('user',{"username":username,"password":tools.md(password)})
  console.log(result)
  if (result.length>0) {
    ctx.session.userinfo = result[0].username;
    ctx.redirect('/admin')
  }else{
    console.log('失败')
  }
})

module.exports = router.routes();  //暴露并且启动路由