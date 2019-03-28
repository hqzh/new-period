var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/login',(req,res)=>{
  res.render('login')
})
app.post('/home',(req,res)=>{
  console.log(req.body)
  res.send('主页')
})
app.get('/',(req,res)=>{
  res.send('hello')
})

app.listen('3001', '127.0.0.1');