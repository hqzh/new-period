var eventEmitter = require("events");
var myEmitter = new eventEmitter();
myEmitter.on("event",function(){
    console.log("event");
})
myEmitter.on("event",function(){
    console.log("event");
})
myEmitter.emit("event");