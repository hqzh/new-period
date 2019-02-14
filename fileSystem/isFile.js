const fs = require('fs');

fs.stat('a',(err,file)=>{
  console.log(file.isFile())
})

fs.stat('hello.txt',(err,file)=>{
  console.log(file.isFile())
})