//app.js文件
//1.引入express模块
const express = require('express')
const mongoose = require('mongoose')
const user = require('./models/users')
// 连接数据库
mongoose.connect('mongodb://localhost:27017/university', {useNewUrlParser: true}, (err) => {
  console.log(err)
});

//2.创建app对象
const app = express()
//定义简单路由  request和response
app.use('/api/login',(req, res) => {
  console.log(req.query)   // req.query获取URL的查询参数串
  // 查询所有数据  查询一条数据使用findOne()
  user.find({userName: req.query.userName},function (error, result) {
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
    res.json(data);   // res.json()传送JSON响应
  })
})

//定义服务启动端口 监听端口
app.listen(4404, () => {
  console.log('app listening on port 8080.')
})