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
  const result = await DB.find('user', { "username": username, "password": tools.md(password) })
  const {code} = ctx.request.body;
  console.log(result)
  console.log(ctx.session.code)
  if (code === ctx.session.code) {
    if (result.length) {
      ctx.session.userinfo = result[0].username;
      ctx.redirect('/admin')
    } else {
      console.log('失败')
    }
  }else{
    console.log("验证码失败")
    ctx.render('admin/error',{
      message:'验证码错误',
      redirect:ctx.state.__HOST__+'/admin/login'
    })
  }
  
})

router.get('/code', async (ctx) => {
  const captcha = svgCaptcha.create({
    color: true,
    background: '#cc9966',
    width: 120,
    height: 34
  });
  // 保存生成的验证码
  ctx.session.code = captcha.text;
  console.log(captcha.text)
  // 设置响应头
  ctx.response.type = 'image/svg+xml'
  ctx.body = captcha.data
})

module.exports = router.routes();  //暴露并且启动路由