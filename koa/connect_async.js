const Koa = require('Koa');

const app = new Koa();
// 假如没加async await  ,打印的是111 222因为第二个是异步，所以会先执行1111
app.use(async (ctx, next) => {
  await next();  // 调用下一个next之前的
  console.log(11111)
})



app.use((ctx, next) => {
  next();
  process.nextTick(function () {
    console.log(2222222)
  })
})


app.listen(3000)