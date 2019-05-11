const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'admin';

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  db.collection('koa').insertOne({'name':'hqzh',"age":14},(err,result)=>{
    if (!err) {
      console.log('add success')
      client.close()
    }
  })
  db.collection('koa').find().toArray((err,docs)=> {
    console.log(docs)
  })
});
