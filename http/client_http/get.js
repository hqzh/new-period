var https = require("https");
https.get("https://blockchain.info/ticker",function(res){
    var statusCode = res.statusCode;
    if(statusCode = 200){
        //buffer一节已经提到过，试着修改下面的代码
        var result = "";
        res.on("data",function(data){
            result+=data;
        })
        res.on("end",function(){
            console.log(result.toString());
        });
        res.on("error",function(e){
            console.log(e.message);
        })
    }
})