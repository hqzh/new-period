const fs = require('fs');

const readStream = fs.createReadStream('read.txt','utf-8');

readStream.on('data',function (data) {
  console.log(data)
})

readStream.on('end',function () {
  console.log('closed')
})

readStream.on('error',function (err) {
  console.log(err)
})
