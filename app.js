// //app.js文件
// //1.引入express模块
// const express = require('express')
// const mongoose = require('mongoose')
// const users = require('./models/users')
// // 连接数据库
// mongoose.connect('mongodb://localhost/university', {useNewUrlParser: true}, (err) => {
//   console.log(err)
// });
// // 连接成功回调监听
// mongoose.connection.on("connected", function(){
//   console.log("mongodb connected success");
// });

// // 连接失败回调监听
// mongoose.connection.on("error", function(){
//   console.log("mongodb connected faile");
// });

// // 连接断开回调监听
// mongoose.connection.on("disconnected", function(){
//   console.log("mongodb connected disconnected");
// });

// //2.创建app对象
// const app = express()

// app.use('/api/login',(req, res) => {  //定义简单路由  request和response
//   console.log(req.query)              // req.query获取URL的查询参数串
//   console.log(req.hostname, req.originalUrl)
  
//   users.find(function (error, result) {  // 查询所有数据  查询一条数据使用findOne()  {id: req.query.id}
//     let data = {
//       data: '',
//       status: ''
//     };
//     if(result[0]) {
//       data.status = 0;
//       data.data = result[0]
//     } else {
//       data.status = 1
//     }
//     console.log(result)
//     console.log(result[0])
//     res.json(result);   // res.json()传送JSON响应   res.send()传送http响应
//   })
// })
// //定义服务启动端口 监听端口
// app.listen(4404, () => {
//   console.log('app listening on port 8080.')
// })
const express = require('express');
var bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
var cookieParser = require('cookie-parser');
// 引入模块
const users = require('./routes/admin/users');
var admins = require('./routes/admins');
// 实例化
var app = express();
// flash 中间件，用来显示通知
app.use(flash());

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next()
});
// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: false, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
      maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
      url: config.mongodb// mongodb 地址
  })
}));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log('error', err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', users);
app.use('/api/admin', admins)
app.listen(4404, '127.0.0.1');
module.exports = app;