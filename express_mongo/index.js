var express = require('express')
var app = express()
const MongoClient = require('mongodb').MongoClient; //引入数据库MongoClient
const url = require('url');
const ejs = require('ejs');

const dbUrl = 'mongodb://localhost:27017'; // Connection URL
  // Database Name
  const dbName = 'test';
  // Create a new MongoClient
const client = new MongoClient(dbUrl);

app.get('/', function (req, res) {
   // Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const result = db.collection('unique').find({})
  console.log(result)
  const list = [];
  result.each(function (err,doc) {
    if (doc !==null) {
      console.log(doc)
      list.push(doc)
    }else{
      console.log(list)
      ejs.renderFile('views/home.ejs',{list},function (err,data) {
        res.send(data)
      })
    }
  })
  client.close();
});
})


app.get('/add', function (req, res) {
 // Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  db.collection('unique').insertOne({"useid":Math.random()},function () {
    
  })
  client.close();
});
  res.send('333')
})


app.get('/edit', function (req, res) {
 // Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  db.collection('unique').updateOne({"useid":1},{$set:{"useid":0}},function () {
    
  })
  client.close();
});
  res.send('333')
})

app.get('/delete', function (req, res) {
 // Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const {query} = url.parse(req.url,true);
  console.log(query)

  db.collection('unique').deleteOne({"useid":+query.useid},function (error,data) {
    if (error) {
      console.log('delete fail')
      return;
    }
    console.log(data.result)
  })
  client.close();
});
  res.send('333')
})

//设置动态路由  http://127.0.0.1:3000/component/xxxx
app.get('/component/:id?', function (req, res) {
  console.log(req.params)
  console.log(req.route)
   res.send('动态路由')
 })
//get传值http://127.0.0.1:3000/params?a=1&b=2
app.get('/params', function (req, res) {
  console.log(req.query)
  console.log(req.route)
   res.send('动态传值')
 })

app.listen(3000)

