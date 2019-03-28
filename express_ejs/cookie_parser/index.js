var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/set', (req, res) => {
  //  属性  值   存在时间
  res.cookie('username', 'jim', { maxAge: 60000 });  
  res.send('设置coolie成功');
});
app.get('/get', (req, res) => {
  console.log(req.cookies)
  res.send('获取');
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(8080);
