const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  if (req.url === '/login') {
    switch (req.method) {
      case 'GET':
        fs.createReadStream('login.html').pipe(res)  //通过管道把文件输送给response，http://www.runoob.com/nodejs/nodejs-stream.html
        break;
      case 'POST':
        //to do something
        break;
      default:
        console.log('other...')
        break;
    }
  } else {
    //将所有url转到login
    res.writeHead(302, {
      'Location': '/login'
    })
    // 没有它来结束http请求，浏览器会一直转圈
    res.end()
  }
})

// 处理submit信息
server.on('request', function (req, res) {
  const body = []
  req.on('data', function (chunk) {
    body.push(chunk)
  })
  req.on('end', function () {
    console.log('------')
    console.log(Buffer.concat(body).toString())
    console.log('1111')
  })

})

server.listen(3000)