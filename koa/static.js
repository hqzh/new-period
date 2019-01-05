const Koa = require('Koa');
const app = new Koa();
const serve = require('Koa-static');
app.use(serve(__dirname+'/html',{extensions:['html']}))
app.listen(3000)