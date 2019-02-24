const G = {};

const app = function (req,res) {
  if (G['login']) {
    G['login'](req,res)  //执行注册的方法
  }
}

app.get= function (string,callback) {
  G[string] = callback;  //注册方法
}
//执行get方法
app.get('login',function (req,res) {
  console.log('login')
  console.log(req);
  console.log(res)
})

app('request','response')