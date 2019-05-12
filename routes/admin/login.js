const Router = require('koa-router');
const tools = require('../../model/tools');
const DB = require('../../modules/db')
const svgCaptcha = require('svg-captcha');

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('admin/login')
})

router.post('/doLogin', async (ctx) => {
  const { username, password } = ctx.request.body
  const result =await DB.find('user',{"username":username,"password":tools.md(password)})
  console.log(result)
  if (result.length) {
    ctx.session.userinfo = result[0].username;
    ctx.redirect('/admin')
  }else{
    console.log('失败')
  }
})

router.get('/code', async (ctx) => {
  const captcha = svgCaptcha.create({color: true ,
    background: '#cc9966' });
  console.log(captcha.text)
  ctx.response.type='image/svg+xml'  
 ctx.body=captcha.data
})

module.exports = router.routes();  //暴露并且启动路由