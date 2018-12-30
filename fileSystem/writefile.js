const fs = require("fs");

// 如果word.txt存在就会创建，flag的默认参数是w,
fs.writeFile('word.txt', "west word", { flag: 'a', encoding: "UTF-8" }, function (err) {
  if (err) {
    throw err;
    return;
  }
  console.log('success')
})

//获取文件的状态

fs.stat('word.txt', function (err, res) {
  if (err) { console.log(err); return; }
  console.log(res)
})