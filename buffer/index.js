const fs = require("fs");

fs.readFile("hello.txt",function(err,res) {
  if(err) console.log(err)
  console.log(res)  //<Buffer 68 65 6c 6c 6f 2e 74 78 74>
  console.log(res.toString())  //hello.txt
})

