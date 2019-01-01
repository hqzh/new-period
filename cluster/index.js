var cluster = require('cluster');
const http = require('http');

var data = 0;//这里定义数据不会被所有进程共享，各个进程有各自的内存区域
if (cluster.isMaster) { //主进程
    var numCPUs = require('os').cpus().length;
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
    }
    data=5;
    console.log('DATA VALUE in MainProcess: %d ' , data);
} else { //子进程,会被调用numCPUs次
   // data++;
    console.log('DATA VALUE in ChildProcess %d: %d ', cluster.worker.id, data);//
// 我这里应该创建了4个进程的http。访问的时候连的是哪个进程呢？？随机的还是node分配的，我实际显示的访问都是最后一个呢。？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
    http.createServer(function (req,res) {
      res.writeHead(200);
      res.end('hello' + cluster.worker.id);
    }).listen(8000);
}