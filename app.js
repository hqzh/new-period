const util = require('util');

const {inspect,log} = util;
let obj = {
  name:'hqzh',
  age:18
}

const str = inspect(obj,{"colors":true});

console.log(str)
log(str)  // 带时间戳