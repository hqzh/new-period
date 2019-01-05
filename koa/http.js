const Koa = require('Koa');

const app = new Koa();

app.use(async (ctx,netx) =>{
  //访问 http://localhost:3000/?kindName=hqzh
  console.log(ctx.method); //GET
  console.log(ctx.query);  //{ kindName: 'hqzh' }
  await netx();
})

app.listen(3000)