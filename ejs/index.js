const http = require('http');
const ejs = require('ejs');
const url = require('url')

const server = http.createServer(function (req,res) {
  res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
  const pathname = url.parse(req.url).pathname;
  if (pathname === '/login') {
    ejs.renderFile('views/login.ejs',{},function (err,data) {
      res.end(data)
    })
  } else {
    res.end('主页')
  }
})


server.listen(3000)