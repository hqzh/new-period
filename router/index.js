const http = require('http');
const ejs = require('ejs');
const url = require('url');
const fs = require('fs');
const model = require('./model');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': "text/html;charset='utf-8'" });
  const pathname = url.parse(req.url).pathname.replace('/', '');
  if (pathname !== 'favicon.ico') {
    // 捕获未定义异常路由错误
    try {
      model[pathname](req, res);
    } catch (error) {
      model['home'](req, res);
    }
  }
});

server.listen(3000);
