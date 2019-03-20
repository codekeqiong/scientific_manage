const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const UsersModel = require('../models/users')
const leavesModel = require('../models/leaves')
const ProjectModel = require('../models/project')
const PersonInfoModel = require('../models/personInfo')

// mongoose.connect('mongodb://localhost/university', { useNewUrlParser: true }, (err) => {
//   console.log(err)
// });
// // mongoose.connect('mongodb://localhost/university')
// // 连接成功回调监听
// mongoose.connection.on("connected", function () {
//   console.log("mongodb connected success");
// });
// // 连接失败回调监听
// mongoose.connection.on("err", function () {
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
app.use('/api/users', (req, res, next) => {
  let page = parseInt(req.body.page)
  let pageSize = parseInt(req.body.pageSize) 
  let searchText = new RegExp(req.body.searchText)
  var query = UsersModel.find(function (err, data) {
  if (err) {
    res.json({
      status: 1,
      data: err.message
    });
    } else {
      query.sort({'_id': -1});
      query.skip((page - 1)*pageSize);
      query.limit(pageSize);
      if(searchText){
        query.where('account', searchText)
      }
      query.exec(function(err, result){
      if(err){
        res.json(err)
      } else {
        UsersModel.find(function(err, results){
          res.json({
            status: 0,
            data: result,
            count: results.length
          });
        });
      }
      });
    }
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
// 删除用户 (_id)
app.use('/api/delete-users', function (req, res) {
  if (req.body) {
    var id = { _id: req.body._id };
    UsersModel.remove(id, function (err, data) {
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
// 修改用户信息(_id)
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
  let page = parseInt(req.body.page)
  let pageSize = parseInt(req.body.pageSize) 
  let searchText = new RegExp(req.body.searchText)
  var query = ProjectModel.find(function (err, data) {
  if (err) {
    res.json({
      status: 1,
      data: err.message
    });
    } else {
      query.sort({'_id': -1});
      query.skip((page - 1)*pageSize);
      query.limit(pageSize);
      if(searchText){
        query.where('projectName', searchText)
      };
      query.exec(function(err, result){
      if(err){
        res.json(err)
      } else {
        ProjectModel.find(function(err, results){
          res.json({
            status: 0,
            data: result,
            count: results.length
          });
        });
      }
      });
    }
  })
})
// 科研项目查询 根据id查询某条数据(_id)
app.use('/api/find-one-project', function (req,res){
  if(req.body) {
      var id = req.body._id
      ProjectModel.findById(id, function (err, data){
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
        status: '1',
        data: '遭遇未知错误'
    });
  }
});
// 科研项目查询 删除操作(_id)
app.use('/api/delete-project', function (req, res) {
  if (req.body) {
    var id ={
      _id: mongoose.Types.ObjectId(req.body._id)
    } 
    ProjectModel.remove(id, function (err, data) {
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
// 科研项目查询 修改操作(_id)
app.use('/api/update-project', function (req, res) {
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
      endTime: req.body.endTime,
      phone: req.body.phone,
      remarks: req.body.remarks
    };
    var id = req.body._id;
    ProjectModel.findByIdAndUpdate(id, params, { new: true }, function (err, data) {
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
// 科研项目审批  通过操作(_id)
app.use('/api/pass-one',function(req, res) {
  if(req.body){
    var newStatus = {
      status: '已通过'
    }
    let id = req.body._id
    ProjectModel.findByIdAndUpdate(id, newStatus, { new: true}, function (err, data) {
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
// 退回操作
app.use('/api/back-one',function(req, res) {
  if(req.body){
    var newStatus = {
      status: '已退回'
    }
    let id = req.body._id
    ProjectModel.findByIdAndUpdate(id, newStatus, { new: true}, function (err, data) {
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
  let page = parseInt(req.body.page)
  let pageSize = parseInt(req.body.pageSize) 
  let searchText = new RegExp(req.body.searchText)
  var query = leavesModel.find(function (err, data) {
  if (err) {
    res.json({
      status: 1,
      data: err.message
    });
    } else {
      query.sort({'_id': -1});
      query.skip((page - 1)*pageSize);
      query.limit(pageSize);
      if(searchText){
        query.where('title', searchText)
      };
      query.exec(function(err, result){
      if(err){
        res.json(err)
      } else {
        leavesModel.find(function(err, results){
          res.json({
            status: 0,
            data: result,
            count: results.length
          });
        });
      }
      });
    }
  })
})
// 留言管理 添加留言
app.use('/api/add-leave',function(req,res){
  if(req.body){
    let params = {
      title: req.body.title,
      autor: req.body.autor,
      content: req.body.content,
    }
    leavesModel.create(params, function (err, data) {
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
// 留言管理 删除留言
app.use('/api/delete-leave',function(req, res){
  if(req.body){
    var id = {
      _id: req.body._id
    }
    leavesModel.remove(id, function(err, data){
      if(err){
        res.json({
          status: 1,
          data: data.message
        });
      } else {
        res.json({
          status: 0,
          data: data
        })
      }
    })
  } else {
    res.json({
      status: 1,
      data: '遭遇未知错误'
    })   
  }
})
// 个人中心 完善个人信息
app.use('/api/perfect-info', function (req,res){
  if(req.body) {
    let params = {
      account: req.body.account,
      account_name: req.body.account_name,
      role: req.body.role ,
      sex: req.body.sex,
      second_college: req.body.second_college,
      native_place: req.body.native_place,
      education: req.body.education,
      birth_date: req.body.birth_date,
      phone: req.body.phone 
    }
    PersonInfoModel.create(params, function (err, data){
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
      status: '1',
      data: '遭遇未知错误'
    });
  }
});
// 定义服务启动端口 监听端口
app.listen(4404, () => {
  console.log('app listening on port 8080.')
})
module.exports = router;