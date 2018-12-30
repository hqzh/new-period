const fs = require('fs');

// 异步的打开文件
fs.open('hello.txt','a',function (err,fd) {
  if(err){
    console.log(err);
    return;
  }
  console.log(fd)
  // 配合open使用，因为第一个参数是文件描述符
  fs.fstat(fd,function (err,res) {
    if(err){
      console.log(err);
      return;
    }
    console.log(res)
  })
})