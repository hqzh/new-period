const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const Config = require('./congfig.js');

const { dbName, url } = Config

const client = new MongoClient(url, { useNewUrlParser: true });

class Db {
  static getInstance() {  //节省性能,只实例化一次
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = ""
    this.connect(); //第一次偷偷给你连上
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
      } else {
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

  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, (err, result) => {
          if (err) {
            reject(err)
            return;
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  update(collectionName, preJson, nextJson) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).updateOne(preJson, { $set: nextJson }, (err, result) => {
          if (err) {
            reject(err)
            return;
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).removeOne(json, (err, result) => {
          if (err) {
            reject(err)
            return;
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  getObjectId(id){
    return new ObjectID(id)  //处理MongoDB的id格式
  }

}

module.exports = Db.getInstance()

// class Db {
//   constructor(){
//     console.log('实例化会执行构造函数')
//     this.connect();
//   }

//   static getInstance(){  //节省性能,只实例化一次
//     if (!Db.instance) {
//       Db.instance= new Db();
//     }
//     return Db.instance;
//   }

//   connect(){
//     console.log('链接数据库')
//   }

//   find(){
//     console.log('查询数据库')
//   }
// }

// const myDb = Db.getInstance();
// const myDb2 = Db.getInstance();
// const myDb3 = Db.getInstance();

// myDb.find();
// myDb2.find();
// myDb3.find();