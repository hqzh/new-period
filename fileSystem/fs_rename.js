const fs = require('fs');

// 具有重命名和剪切的功能

// fs.rename('log.txt','log1.txt',(err)=>{
//   if(err){
//     return
//   }
//   console.log('创建成果')
// })

fs.rename('log1.txt','css/log1.txt',(err)=>{
  if(err){
    return
  }
  console.log('创建成果')
})