const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/logn',{useNewUrlParser:true});
 
const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection err'));

db.once('open',function (callback) {
  console.log('success')
})

