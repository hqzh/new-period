const rs = require("fs").createReadStream('hello.txt',{highWaterMark:10}) //一次读取10kb；

let data = [];

rs.on('data',function (chunk) {
  data.push(chunk);
})

rs.on('end',function(){
  let buf = Buffer.concat(data);
  console.log(buf.toString())
})