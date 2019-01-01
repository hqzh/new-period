// argv0 <string> 发送给子进程的 argv[0] 的值。如果没有指定，则设为 command 的值。
var begin =  process.argv[2];

console.log("I am worker "+begin);

process.on("message",function(msg){
    console.log("from parent ",msg);
    process.exit();
});

process.send({hello:"parent"});