const http = require('http');

const server = http.createServer(function (req,res) {
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('hello,http')
})

server.on('connection',function (req,res) {
  const body = []
  req.on('data',function (chunk) {
    console.log(chunk)
    body.push(chunk)
  })
  req.on('end',function () {
    console.log(Buffer.concat(body).toString())
  })
  // console.log(req)
  // console.log(res)
  // console.log('connection')
})

server.on('request',function(req,res) {
  // console.log(req.url)
  // console.log(req.method)
  // console.log(req.headers)
 
})



server.listen(3000)