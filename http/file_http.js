const fs = require('fs');
const http = require('http');

const server = http.createServer(function (req, res) {
  if (req.url === '/') {
    // 同步的 readdir(3)。读取目录的内容。
    const fileList = fs.readdirSync('./');
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    // 返回文件列表，buffer数组转为字符串
    res.end(fileList.toString())
  } else {
    const path = req.url;
    fs.readFile('.' + path, function (err, data) {
      if (err) {
        res.end('file not found');
        throw err;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })  //设置不返回中文乱码
      res.end(data)
    })
  }
})

server.listen(3000);

console.log('listening in 3000')

// 处理异常,在同步代码情况下，当未处理异常列表增长时，会触发 'uncaughtException' 事件。
process.on('uncaughtException',function () {
  console.log('error , please ref')
})