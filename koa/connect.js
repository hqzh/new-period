const Koa = require('Koa');

const app = new Koa();

app.use((ctx, next) => {
  console.log(1111);
  next();  // 调用下一个next之前的
  console.log(1212)
})



app.use((ctx, next) => {
  console.log(2222);
  next();
  console.log(2121)
})

// 1111  2222  2121  1212  洋葱结构

app.listen(3000)