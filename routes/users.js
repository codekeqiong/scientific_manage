const express = require('express');
const mongoose = require('mongoose');

const Users = require('../models/users')
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond width a resource');
})

router.get('/user', function (req, res, next) {
  Users.fetch(function(err, users) {
    if(err) {
      console.log(err)
    }
    res.render('users', {title: '用户列表', users: users})
  })
})

module.exports = router;