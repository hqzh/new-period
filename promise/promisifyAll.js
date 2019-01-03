const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'))  //  将fs模块的全部方法转成Promise形态，超便利，转换之后，会在原来的方法名加上Async后缀

fs.readFileAsync('1.txt','utf8').then(data => console.log(data))