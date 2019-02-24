const http = require('http');
const url = require('url');

const G = {};

//定义方法开始和结束
const app = function (req,res) {
  let pathname = url.parse(req.url).pathname;

  if (!pathname.endsWith('/')) {
    pathname = pathname + '/'
  }
  if (G[pathname]) {
    G[pathname](req,res)  //执行注册的方法
  }else{
    res.end('no route')
  }
}

app.get= function (string,callback) {
  if (!string.endsWith('/')) {
    string = string +'/'
  }

  if (!string.startsWith('/')) {
    string = '/'+string ;
  }

  G[string] = callback;  //注册方法
}

//只要有请求,就会触发app方法
http.createServer(app).listen(3000)

// 注册login这个路由
app.get('login',function (req,res) {
  console.log('login,,,,')
  res.end('login')
})
app.get('home',function (req,res) {
  console.log('home,,,,')
  res.end('home')
})