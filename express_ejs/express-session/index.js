var express = require('express');
var session = require('express-session')

var app = express();
app.use(session({
  secret: 'keyboard cat', //随便写的字符串参数,作为服务器端生成session的签名
  name:'session_id',   // 保存在本地cookie的一个属性名,默认connect.sid, 可以不设置
   resave: false,   //强制保存session,即使它并没有变化,默认为true,建议设置成false
  saveUninitialized: true,  //强制将未初始化的session存储,就是未给session设置值的时候赋值,见下面默认设置true;
  // cookie的所有参数都可以在这里配置
  cookie: { 
    // secure: true, //https可以访问cookie
    maxAge:10000, //设置过期时间
    // 设置30分钟过期的话,只要浏览页面,30分钟就一直重置,直到没有操作后30分钟后才过期
    rolling:true, //在每次请求时强行设置cookie,这将重置cookie过期时间(默认false)
  }   
}))

app.get('/set', (req, res) => {
  //  req.session;  //saveUninitialized: true,  //强制将未初始化的session存储,就是未给session设置值的时候赋值,见下面默认设置true;
  req.session.userinfo ='hqzh' 
  res.send('设置session成功');
});

app.get('/loginOut', (req, res) => {
  // req.session.cookie.maxAge = 0;
  req.session.destroy(err => console.log(err))
  res.send('退出成功');
});


app.get('/', (req, res) => {
  if (req.session.userinfo) {
    res.send('hello,' + req.session.userinfo)
  }else{
    res.send('未登陆');
  }
  
});

app.listen(8080);
