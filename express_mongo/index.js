var express = require('express')
var app = express()
const MongoClient = require('mongodb').MongoClient; //引入数据库MongoClient

const url = 'mongodb://localhost:27017'; // Connection URL
  // Database Name
  const dbName = 'test';
  // Create a new MongoClient
const client = new MongoClient(url);

app.get('/', function (req, res) {
  res.send('Hello World')
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

app.listen(3000)

