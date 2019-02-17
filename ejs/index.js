const http = require('http');
const ejs = require('ejs');
const url = require('url')


const server = http.createServer(function (req,res) {
  res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
  const pathname = url.parse(req.url).pathname;
  if (pathname === '/login') {
    ejs.renderFile('views/login.ejs',{
      message:'我是message',
      list:[1111,2222,3333]
    },function (err,data) {
      res.end(data)
    })
  } else {
    ejs.renderFile('views/home.ejs',{},function (err,data) {
      res.end(data)
    })
  }
})


server.listen(3000)