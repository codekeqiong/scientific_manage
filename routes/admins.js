const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UsersModel = require('../models/users')
const leavesModel = require('../models/leaves')
const ProjectModel = require('../models/project')
const PersonInfoModel = require('../models/personInfo')
const dbHelper = require('../config/dbHelper');

// mongoose.connect('mongodb://localhost/university', { useNewUrlParser: true }, (err) => {
//   console.log(err)
// });
// // mongoose.connect('mongodb://localhost/university')
// // 连接成功回调监听
// mongoose.connection.on("connected", function () {
//   console.log("mongodb connected success");
// });
// // 连接失败回调监听
// mongoose.connection.on("error", function () {
//   console.log("mongodb connected faile");
// });
// // 连接断开回调监听
// mongoose.connection.on("disconnected", function () {
//   console.log("mongodb connected disconnected");
// });

//创建app对象  app.use()用于静态文件
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 查询所有用户数据
app.use('/api/users', (req, res) => {         // 定义简单路由
  console.log(req.query, req.hostname, req.originalUrl)              // req.query获取URL的查询参数串  
  UsersModel.find(function (error, result) {     // 查询一条数据使用findOne()  {id: req.query.id}
    let data = {
      data: '',
      status: ''
    };
    if (result[0]) {
      data.status = 0
      data.data = result[0]
    } else {
      data.status = 1
    }
    res.json(result);   // res.json()传送JSON响应   res.send()传送http响应
  })
})
// 用户管理 新增用户
app.use('/api/add-users', (req, res) => {
  if (req.body) {
    var params = {
      account: req.body.account,
      userName: req.body.userName,
      password: req.body.password,
      role: req.body.role,
      // adminDate: Date.now()
    };
    UsersModel.create(params, function (err, data) {
      if (err) {
        res.json({
          status: 1,
          data: err.message
        });
      } else {
        res.json({
          status: 0,
          data: data
        });
      }
    })
  } else {
    res.json({
      status: 1,
      data: '遭遇未知错误'
    });
  }
})
// 删除用户 (account)
app.use('/api/delete-users', function (req, res) {
  if (req.body) {
    var account = { account: req.body.account };
    UsersModel.remove(account, function (err, data) {
      if (err) {
        res.json({
          status: 1,
          data: err.message
        });
      } else {
        res.json({
          status: 0,
          data: data
        });
      }
    })
  } else {
    res.json({
      status: 1,
      data: '遭遇未知错误'
    });
  }
})
// 修改用户信息
app.use('/api/update-users', function (req, res) {
  if (req.body) {
    var params = {
      account: req.body.account,
      userName: req.body.userName,
      password: req.body.password,
      role: req.body.role,
      // adminDate: Date.now()
    };
    var id = req.body._id;
    UsersModel.findByIdAndUpdate(id, params, { new: true }, function (err, data) {
      if (err) {
        res.json({
          status: 1,
          data: err.message
        });
      } else {
        res.json({
          status: 0,
          data: data
        });
      }
    })
  } else {
    res.json({
      status: 1,
      data: '遭遇未知错误'
    });
  }
})
// 获取留言列表
app.use('/api/leave', (req, res) => {         // 定义简单路由
  console.log(req.query, req.hostname, req.originalUrl)              // req.query获取URL的查询参数串  
  leavesModel.find(function (error, result) {     // 查询一条数据使用findOne()  {id: req.query.id}
    let data = {
      data: '',
      status: ''
    };
    if (result[0]) {
      data.status = 0
      data.data = result[0]
    } else {
      data.status = 1
    }
    res.json(result);   // res.json()传送JSON响应   res.send()传送http响应
  })
})
// 科研项目申请
app.use('/api/add-project', (req, res) => {
  if (req.body) {
    var params = {
      projectName: req.body.projectName,
      userName: req.body.userName,
      second_college: req.body.second_college,
      keywords: req.body.keywords,
      abstract: req.body.abstract,
      field: req.body.field,
      approval: req.body.approval,
      fund: req.body.fund,
      createDate: req.body.createDate,
      endTime:req.body.endTime,
      phone: req.body.phone,
      remarks: req.body.remarks,
      status: req.body.status
    };
    ProjectModel.create(params, function (err, data) {
      if (err) {
        res.json({
          status: 1,
          data: err.message
        });
      } else {
        res.json({
          status: 0,
          data: data
        });
      }
    })
  } else {
    res.json({
      status: 1,
      data: '遭遇未知错误'
    });
  }
})
// 科研项目查询 获取数据
app.use('/api/query-project', (req, res) => {
  ProjectModel.find(function (error, result) {     // 查询一条数据使用findOne()  {id: req.query.id}
    let data = {
      data: '',
      status: ''
    };
    if (result[0]) {
      data.status = 0
      data.data = result[0]
    } else {
      data.status = 1
    }
    res.json(result);   // res.json()传送JSON响应   res.send()传送http响应
  })
})
// 科研项目查询 删除操作(projectName)
app.use('/api/delete-project', function (req, res) {
  if (req.body) {
    var projectName = { projectName: req.body.projectName };
    ProjectModel.remove(projectName, function (err, data) {
      if (err) {
        res.json({
          status: 1,
          data: err.message
        });
      } else {
        res.json({
          status: 0,
          data: data
        });
      }
    })
  } else {
    res.json({
      status: 1,
      data: '遭遇未知错误'
    });
  }
})
// 科研项目查询 修改操作  (待改)
app.use('/api/update-project', function (req, res) {
  if (req.body) {
    var params = {
      account: req.body.account,
      userName: req.body.userName,
      password: req.body.password,
      role: req.body.role,
      // adminDate: Date.now()
    };
    var id = req.body._id;
    UsersModel.findByIdAndUpdate(id, params, { new: true }, function (err, data) {
      if (err) {
        res.json({
          status: 1,
          data: err.message
        });
      } else {
        res.json({
          status: 0,
          data: data
        });
      }
    })
  } else {
    res.json({
      status: 1,
      data: '遭遇未知错误'
    });
  }
})
// 科研项目审批

//定义服务启动端口 监听端口
app.listen(4404, () => {
  console.log('app listening on port 8080.')
})
module.exports = router;