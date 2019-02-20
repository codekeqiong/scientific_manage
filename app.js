//app.js文件
//1.引入express模块
const express = require('express')
const mongoose = require('mongoose')
const user = require('./models/users')
// 连接数据库
mongoose.connect('mongodb://localhost/university', {useNewUrlParser: true}, (err) => {
  console.log(err)
});
// 连接成功回调监听
mongoose.connection.on("connected", function(){
  console.log("mongodb connected success");
});

// 连接失败回调监听
mongoose.connection.on("error", function(){
  console.log("mongodb connected faile");
});

// 连接断开回调监听
mongoose.connection.on("disconnected", function(){
  console.log("mongodb connected disconnected");
});

//2.创建app对象
const app = express()
//定义简单路由  request和response
app.use('/api/login',(req, res) => {
  console.log(req.query)   // req.query获取URL的查询参数串
  console.log(req.hostname, req.originalUrl)
  // 查询所有数据  查询一条数据使用findOne()  {id: req.query.id}
  user.find(function (error, result) {
    let data = {
      data: '',
      status: ''
    };
    if(result[0]) {
      data.status = 0;
      data.data = result[0]
    } else {
      data.status = 1
    }
    console.log("返回结果" + result[0])
    res.json(result);   // res.json()传送JSON响应   res.send()传送http响应
  })
})
//定义服务启动端口 监听端口
app.listen(4404, () => {
  console.log('app listening on port 8080.')
})