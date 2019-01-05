const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login',{useNewUrlParser:true});

const db = mongoose.connection;

const loginSchema = new mongoose.Schema({
  username:String,
  password:String,
})

const login = db.model('login',loginSchema,'login')  //第三个参数为collection的名字，如果漏掉了这个参数，mongoose会自动创建一个复数即logins的collection，那样就会有一个预期之外的collection了；

const user1 = new login({username:'hqzh',password:'123456'})

user1.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('success')
})

const query = login.find({username:'hqzh'})

query.then(doc=>{
  console.log(doc)
})