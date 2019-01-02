var async = require("async");
var fs= require("fs");
function func1 (callback){
    fs.readFile("1.txt","utf-8",callback);
}

function func2(callback){
    fs.readFile("2.txt","utf-8",callback);
}

function func3(callback){
    fs.readFile("3.txt","utf-8",callback);
}


async.series([func1,func2,func3],function(err,data){
    console.log(data);//[ '1.txt', '2.txt', '3.txt' ]
})

//  和series不同的是它是并行执行，执行时间由耗时最长的调用决定
async.parallel([func1,func2,func3],function(err,data){
  console.log(data);//[ '1.txt', '2.txt', '3.txt' ]
})


function func1 (callback){
    fs.readFile("1.txt","utf-8",callback);
}

function func2(value,callback){
    console.log("上一个操作传入的值",value);
    fs.readFile("2.txt","utf-8",callback);
}

function func3(value,callback){
    console.log("上一个操作传入的值",value);
    fs.readFile("3.txt","utf-8",callback);
}

async.waterfall([func1,func2,func3],function(err,data){
    console.log(data);
})
//输出结果
// 上一个操作传入的值 1.txt
// 上一个操作传入的值 2.txt
// 3.txt


function myReadFile(path,callback){
    fs.readFile(path,"utf-8",callback);
}

async.map(['1.txt','2.txt','3.txt'], myReadFile, function(err, results) {
    console.log(results);
});