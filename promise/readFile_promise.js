var fs = require("fs");

//promise在某一时刻只有一种状态，要么pending => resolved ,要么 pending => rejected,一旦状态转换完成就无法改变
function readFile_promises(path){
    return  new Promise(function(resolve, reject) {
        fs.readFile(path,"UTF-8",function(err,data){
            if (data){
                resolve(data);  //如果参数是常量，会将常量原封不动的返回
            } else {
                reject(err);
            }
        });
    });
}

readFile_promises('1.tx1t').then(data => console.log(data),err=> console.log(err,'333')) // 或者这样.catch(err => console.log(err,'eee'))

const p = new Promise((resolve,reject)=>{
    console.log('begin');
    resolve()
})
setTimeout(() => {
    p.then(data => console.log('end'))  //立马打出begin,5秒后打end,说明Promise从被创建的那一刻起就开始执行，then方法只是提供了访问promise状态的接口，与promise的执行无关
}, 5000);

module.exports = readFile_promises;