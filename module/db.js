const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Config = require('./congfig.js');

const { dbName, url } = Config

const client = new MongoClient(url, { useNewUrlParser: true });

class Db {
  static getInstance(){  //节省性能,只实例化一次
    if (!Db.instance) {
      Db.instance= new Db();
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = ""
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {  //解决数据库多次连接的问题
        client.connect((err) => {
          assert.equal(null, err);
          if (err) {
            reject(err)
          } else {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            this.dbClient = db;
            resolve(db)
          }
        });
      }else{
        resolve(this.dbClient);
      }
    })
  }

  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const res = db.collection(collectionName).find(json);
        res.toArray((err, doc) => {
          if (err) {
            reject(err)
          }
          resolve(doc)
        })
      })
    })
  }
}

module.exports = Db.getInstance()