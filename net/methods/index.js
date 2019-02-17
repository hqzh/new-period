const http = require('http');
const ejs = require('ejs');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res)=> {
  res.writeHead(200, { 'Content-Type': "text/html;charset='utf-8'" });
  const pathname = url.parse(req.url).pathname;
  if (pathname === '/login') {
    ejs.renderFile('views/form.ejs', {}, (err, data) =>{
      res.end(data);
    });
  } else if (pathname === '/dologin') {
    // 获取get请求数据
    // console.log(url.parse(req.url,true).query)
    // 获取post请求数据
    let postStr = '';
    req.on('data', (chunk) =>{
      postStr += chunk;
    });
    req.on('end', (err, chunk) =>{
      fs.appendFile('login.txt', postStr + '\n', (err) =>{
        if (err) {
          console.log(err);
          return;
        }
      });
    });
    console.log('写入成功');
    res.end("<script>alert('登录成功')</script>");
  } else {
    ejs.renderFile('views/home.ejs', {}, (err, data) =>{
      res.end(data);
    });
  }
});

server.listen(3000);
