// 该特性从node8.0之后从社区第三方库bluebird汲取了，在util模块中，该方法可以将一个对象转换为promise
const Promise = require("bluebird");
const readFile_promise = Promise.promisify(require('fs').readFile);

readFile_promise('1.txt','utf-8').then(data=>console.log(data))
