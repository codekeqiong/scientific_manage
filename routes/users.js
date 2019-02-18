const express = require('express')
const mongoose = require('mongoose')
const Users = require('../models/users')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.send('respond width a resource')
})

router.get('/user', function (req, res, next) {
  Users.fetch(function(err, users) {  // fetch()方法提供了一种简单，合理的方式来跨网络异步获取资源
    if(err) {
      console.log(err)
    }
    //res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。
    //callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
    res.render('user', {title: '用户列表', users: users})
  })
})

module.exports = router;