const fs = require('fs');

fs.mkdir('css',(err)=>{
  if(err){
    return
  }
  console.log('创建成果')
})