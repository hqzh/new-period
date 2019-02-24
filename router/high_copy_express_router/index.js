const route = require('./http_route');
const app = route();
const http = require('http');
const server = http.createServer(app);

app.get('/',function (req,res) {
  res.send('login')
})