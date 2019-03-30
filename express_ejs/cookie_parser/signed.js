var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser('加密字符串，随意'));  // 配合

app.get('/set', (req, res) => {
  //  属性  值   存在时间
  res.cookie('username', 'jim', { maxAge: 60000 ,signed:true});  
  res.send('设置coolie成功');
});
app.get('/get', (req, res) => {
  console.log(req.signedCookies)  //获取加密的cookie信息
  res.send('获取');
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(8080);
