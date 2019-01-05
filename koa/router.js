const Koa = require('Koa');

const bodyParser = require('Koa-bodyparser');

var Router = require('koa-router');

const app = new Koa();
var router = new Router();

app.use(bodyParser());
app.use(router.routes())

router.get('/',async (ctx,next) =>{
  ctx.response.body = `
  <h1>index</h1>
  <form action='/login' method='post'>
    <p>
    name: <input name='name'>
    </p>
    <p>
    password: <input name='password'>
    </p>
    <p>
      <input type='submit' value='submit'>
    </p>
  </form>
  `
})

router.post('/login',async(ctx,next) =>{
  console.log(ctx.request.body)
  let name = ctx.request.body.name || "",
      password = ctx.request.body.password || "";
  if(name === 'hqzh' && password === '123456'){
    ctx.body = 'success'
  }else{
    ctx.body = 'login err'
  }
})

app.listen(3000)