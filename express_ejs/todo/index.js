const express = require('express');

const app = new express();

// app.engine('html', require('ejs').renderFile); //可以把ejs模板后缀改为html
app.set('view engine', 'ejs'); //配置ejs模板引擎,ejs要写在views的文件夹里面,找文件默认会在这个文件夹里面找,后缀也可以省略
// app.set('views', __dirname + '/statics'); //设置去根目录下的statics目录下面找views文件夹

app.use(express.static(__dirname + '/public'));  //给public目录下面的文件提供静态web服务的中间件,会在路由匹配之前查找,可以写多个,  http://localhost:3001/css/style.css

//  http://localhost:3001/static/imgs/1.gif配置虚拟目录的静态web服务,即检测到static路由就去public的目录下面找
app.use('/static', express.static(__dirname + '/public'));

// 比如可以用在权限判断,没有登录就跳转到登录页面
app.use((req,res,next)=> {
  console.log('匹配任何路由的应用级中间件,有多少次请求就会进来多少次,全局的');
  next(); //路由继续向下匹配
  
})

app.use((req,res)=> {
  res.status(404).send('无匹配的路由')
})


app.use('/',(req,res,next)=> {
  console.log('路由级中间件');
  next(); //路由继续向下匹配
})

app.get('/', (req, res) => {
  // res.render('index',{},(err,html)=>{
  // 写了这个回调就要send或rerun
  //   console.log(html)
  //   res.send(html)
  // })
  res.render('index', { title: 'ejs模板' });
});

app.listen('3001', '127.0.0.1');
