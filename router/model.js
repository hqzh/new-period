const app = {
  login:function (req,res) {
    console.log('login');
    res.end('login')
  },
  home:function (req,res) {
    console.log('home');
    res.end('home')
  }
}

module.exports = app;