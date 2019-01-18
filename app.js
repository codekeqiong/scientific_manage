//app.js文件//1.引入express模块
const express = require('express')
const mongoose = require('mongoose');
const user = require('./models/users');

mongoose.connect('mongodb://localhost/vue', {useNewUrlParser: true}, (err) => {
  console.log(err);
});


//2.创建app对象
const app = express()
//定义简单路由
app.use('/login',(req, res) => {
  console.log(req.query)
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
    console.log(result)
    res.json(data);
  })
})
//定义服务启动端口
app.listen(4404, () => {
  console.log('app listening on port 8080.')
})