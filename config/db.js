var mongoose = require("mongoose"); //引入mongoose
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 
mongoose.connect('mongodb://localhost/university', { useNewUrlParser: true });
var db = mongoose.connection;
// 连接成功回调监听
db.on("connected", function () {
  console.log("mongodb connected success");
});
// 连接失败回调监听
db.on("error", function () {
  console.log("mongodb connected faile");
});
// 连接断开回调监听
db.on("disconnected", function () {
  console.log("mongodb connected disconnected");
});
 
module.exports = db;