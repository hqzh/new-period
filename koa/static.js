const Koa = require('Koa');
const app = new Koa();
const serve = require('Koa-static');
app.use(serve(__dirname+'/html',{extensions:['html']}))
app.listen(3000)

// 通过下面部署到公网
// npm install -g localtunnel
// lt --subdomain chengwa --port 3000 /index
