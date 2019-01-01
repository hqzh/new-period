// 运行之前需要先启一个本地服务127.0.0.1：80
var http = require("http");
var url = require("url");

http.createServer(function(req,res){
    console.log(req.url);
    var options = url.parse(req.url);
    options.headers = req.headers;
    // console.log(options)

    var proxyRequest = http.request(options,function(pres){
        console.log(pres.statusCode)
        res.writeHead(pres.statusCode,pres.headers);
        pres.on('data',function (data) {
            console.log(data)
            res.write(data);
            console.log(data.toString())
        });
        pres.on('end',function () {
            console.log(111)
           res.end();
        });

    });

    req.on('data',function(data){
        proxyRequest.write(data);
    });

    req.on('end',function(){
       proxyRequest.end();
    });

}).listen(80);
