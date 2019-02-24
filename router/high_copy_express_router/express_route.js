const url = require('url');

// 封装方法改变res,绑定res.send()
function changeRes(res) {
  res.send = function (data) {
    res.writeHead(200, { 'Content-Type': "text/html;charset='utf-8'" }); 
    res.end(data)
  }
}

const Server = function() {
  const G = this;
  this._get={};
  this._post={};

  const app = function(req, res) {
    changeRes(res)
    let pathname = url.parse(req.url).pathname;
    const method = req.method.toLowerCase();
    if (!pathname.endsWith('/')) {
      pathname = pathname + '/';
    }
    if (G['_'+method][pathname]) {
      if (method ==='post') {
        let postStr = ""
        req.on('data',function (chunk) {
          postStr += chunk
        })
        req.on('end',function (err,chunk) {
          console.log(postStr)
          req.body = postStr
          G['_'+method][pathname](req,res)
        })
      }else if (method ==='get') {
        G['_'+method][pathname](req,res)
      }
    } else {
      res.end('no route');
    }
  };

  app.get = function(string, callback) {
    if (!string.endsWith('/')) {
      string = string + '/';
    }

    if (!string.startsWith('/')) {
      string = '/' + string;
    }

    G._get[string] = callback;
  };
  app.post = function(string, callback) {
    if (!string.endsWith('/')) {
      string = string + '/';
    }

    if (!string.startsWith('/')) {
      string = '/' + string;
    }

    G._post[string] = callback;
  };
  return app;
};

module.exports = Server();
