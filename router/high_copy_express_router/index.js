const http = require('http');
const app = require('./express_route');
const ejs = require('ejs');


http.createServer(app).listen(3000);

app.get('/login',function (req,res) {
  ejs.renderFile('./static/login.ejs',{},function (err,data) {
    res.send(data)
  })
})

app.post('/dologin',function (req,res) {
  res.send("<script>alert('登录成功')</script>")
})