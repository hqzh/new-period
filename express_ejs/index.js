const express = require('express');

const app = new express();

// app.engine('html', require('ejs').renderFile); //可以把ejs模板后缀改为html
app.set('view engine', 'ejs'); //配置ejs模板引擎,ejs要写在views的文件夹里面,找文件默认会在这个文件夹里面找,后缀也可以省略
// app.set('views', __dirname + '/statics'); //设置去根目录下的statics目录下面找views文件夹

app.use(express.static(__dirname + '/public'));  //给public目录下面的文件提供静态web服务的中间件,可以写多个,  http://localhost:3001/css/style.css

// GET /static/style.css etc.配置虚拟目录的静态web服务,即检测到static路由就去public的目录下面找
// app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.render('index',{},(err,html)=>{
  // 写了这个回调就要send或rerun
  //   console.log(html)
  //   res.send(html)
  // })
  res.render('index', { title: 'ejs模板' });
});

app.listen('3001', '127.0.0.1');
