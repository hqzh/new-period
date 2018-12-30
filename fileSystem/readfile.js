const fs = require("fs");

// 异步读取
fs.readFile('hello.txt',function (err) {
  if(err) throw err;
  // console.log(data.toString(),'111111111')
})

// 直接放回文本数据内容
let data =  fs.readFileSync('hello.txt',{encoding:'UTF-8'});

// console.log(data,'222222222222222222')

// 读取大文件

const stream = fs.createReadStream('hello.txt');

stream.on('data',function (chunk) {
  console.log(chunk.toString(),'3333333')
})

