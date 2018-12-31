var readline = require("readline");
var  fs = require("fs");
var rl = readline.createInterface({
    input:fs.createReadStream("./read.txt")
});

rl.on("line", function(data){
    console.log(data);
});

rl.on("close",function(){
    console.log("cloesd");
})