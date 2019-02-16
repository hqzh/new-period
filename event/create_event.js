var eventEmitter = require("events");
const fs = require('fs');
var myEmitter = new eventEmitter();


myEmitter.on("getIo",function(res){
    console.log(res.toString());
})

fs.readFile('hello.txt',(err,res)=>{
    myEmitter.emit("getIo",res);
})


