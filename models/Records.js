var base = require('./Base');  
var ObjectId = base.ObjectId;  
var _Records =new base.Schema({  
    username:String,//用户名  
    score:Number,//战绩
    createTime:{type:Date,default:Date.now}//创建时间  
});  


var Records = base.mongoose.model('Records',_Records,'records');//指定在数据库中的collection名称为todos  
exports.Records = Records;//导出实体 