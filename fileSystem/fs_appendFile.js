const fs = require('fs')

fs.appendFile('log.txt','内容追加\n',function (err) {
  if(err){
    return ;
  }
  console.log('追加成功')
})