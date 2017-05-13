var mongoose = require('mongoose');//引入mongoose库  
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost:27017/records');//mongodb连接地址,demo为数据库名称,默认mongodb连接不需要密码

var db = mongoose.connection;

db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});

exports.mongoose = mongoose;//导出mongoose对象  