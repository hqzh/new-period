const Koa = require('Koa');

const app = new Koa();

app.use(ctx => {
  // 这两个属于原生的request和response对象；
  // console.log(ctx.res);
  // console.log(ctx.req);
  // 这两个属于ctx自行封装的精简对象，只有一部分常用属性
  // console.log(ctx.request);
  // console.log(ctx.response);
  console.log(ctx.state)  //官方推荐后端返回前端消息都挂载在这个对象下面 ctx.state.user = ...
  console.log(ctx.app)  // ctx对app对象的引用
})

app.listen(3000)