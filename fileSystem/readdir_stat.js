const fs = require('fs');
// 统计目录下的所有文件名
function getAllFileFromPath(path) {
  // callback 有两个参数 (err, files)，其中 files 是目录中的文件名的数组。
  fs.readdir(path,function(err,files) {
    // 使用同步方法
    for (const subPath of files) {
      // 避免层数过多使用statSync
      const statObj = fs.statSync(path +"/" + subPath);
      if(statObj.isDirectory()){  //判断是否为跟目录
        console.log("dir",subPath);
        getAllFileFromPath(path+'/'+subPath);
      }else{
        console.log('file:',subPath);
      }
    }
  })
}

getAllFileFromPath(__dirname)