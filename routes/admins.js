const express = require('express')  //快速的搭建一个 Web 开发框架
const router = express.Router()
var bodyParser = require('body-parser')   // 解析浏览器发送来的 body 数据
const mongoose = require('mongoose')
const UsersModel = require('../models/users')
const leavesModel = require('../models/leaves')
const ProjectModel = require('../models/project')
const AcademicModel = require('../models/academic')
const WorkModel = require('../models/work')
const LiteraryModel = require('../models/literary')
const ArtModel = require('../models/art')
const PatentModel = require('../models/patent')
const ActivityModel = require('../models/activity')
const PersonInfoModel = require('../models/personInfo')
let kindType
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
// 登录
app.use('/api/login', (req, res) => {
  let account = req.body.account,
    userName = req.body.userName,
    password = req.body.password
  UsersModel.findOne(function(err, data){
    if(err){
      console.log(err)
    }
    if(!account){
      console.log('该用户不存在')
    }
    account.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err);
      }
      if(isMatch){
        req.session.account = account;   //将账户名存入session中
        console.log('登录成功'+ account);
        return res.redirect('/');
      } else {
        return res.redirect('/login');
      }
    })
  })
})
// 退出登录
app.use('/api/loginout', function(req, res){
  delete req.session.account   //删除session中保存的账号
  res.redirect('/');
})
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
      sex: req.body.sex,
      second_College: req.body.second_College,
      native_Place: req.body.native_Place,
      education: req.body.education,
      phone: req.body.phone
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
      account: req.body.account,
      userName: req.body.userName,
      second_college: req.body.second_college,
      field: req.body.field,
      approval: req.body.approval,
      createDate: req.body.createDate,
      endTime:req.body.endTime,
      phone: req.body.phone,
      remarks: req.body.remarks,
      status: req.body.status,
      isConclusion: req.body.isConclusion,
      category: req.body.category,
      scores: req.body.scores
    };
    if(req.body.category == '科研项目'){
      params.position = req.body.position
      params.depart = req.body.depart
      kindType = ProjectModel
    } else if(req.body.category == '学术论文'){
      params.tutor = req.body.tutor
      params.keywords = req.body.keywords
      kindType = AcademicModel
    } else if(req.body.category == '著作'){
      params.keywords = req.body.keywords
      params.editMethod = req.body.editMethod
      kindType = WorkModel
    }else if(req.body.category == '文学作品'){
      params.keywords = req.body.keywords
      params.tutor = req.body.tutor
      kindType = LiteraryModel
    } else if(req.body.category == '艺体'){
      params.keywords = req.body.keywords
      params.artArea = req.body.artArea
      kindType = ArtModel
    } else if(req.body.category == '注册专利'){
      params.patentType = req.body.patentType
      params.cooperation = req.body.cooperation
      kindType = PatentModel
    } else {
      params.keywords = req.body.keywords
      params.type = req.body.type
      kindType = ActivityModel
    }
    kindType.create(params, function (err, data) {
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
    if(req.body.category == '1'){
      params.position = req.body.position
      params.depart = req.body.depart
      kindType = ProjectModel
    } else if(req.body.category == '2'){
      params.tutor = req.body.tutor
      params.keywords = req.body.keywords
      kindType = AcademicModel
    } else if(req.body.category == '3'){
      params.keywords = req.body.keywords
      params.editMethod = req.body.editMethod
      kindType = WorkModel
    }else if(req.body.category == '4'){
      params.keywords = req.body.keywords
      params.tutor = req.body.tutor
      kindType = LiteraryModel
    } else if(req.body.category == '5'){
      params.keywords = req.body.keywords
      params.artArea = req.body.artArea
      kindType = ArtModel
    } else if(req.body.category == '6'){
      params.patentType = req.body.patentType
      params.cooperation = req.body.cooperation
      kindType = PatentModel
    } else {
      params.keywords = req.body.keywords
      params.type = req.body.type
      kindType = ActivityModel
    }
    kindType.findByIdAndUpdate(id, params, { new: true }, function (err, data) {
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
  let category = req.body.category
  let modelType = ProjectModel
  switch(category){
    case '1': modelType = ProjectModel;
    break;
    case '2': modelType = AcademicModel;
    break;
    case '3': modelType = WorkModel;
    break;
    case '4': modelType =LiteraryModel;
    break;
    case '5': modelType = ArtModel;
    break;
    case '6': modelType = PatentModel;
    break;
    case '7': modelType = ActivityModel;
    break;
  }
  var query = modelType.find(function (err, data) {
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
        modelType.find(function(err, results){
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
      let id = req.body._id;
      let category = req.body.category;
      let modelType = ProjectModel;
      switch(category){
        case '1': modelType = ProjectModel;
        break;
        case '2': modelType = AcademicModel;
        break;
        case '3': modelType = WorkModel;
        break;
        case '4': modelType = LiteraryModel;
        break;
        case '5': modelType = ArtModel;
        break;
        case '6': modelType = PatentModel;
        break;
        case '7': modelType = ActivityModel;
        break;
      }
      modelType.findById(id, function (err, data){
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
    let category = req.body.category;
    let modelType = ProjectModel;
      switch(category){
        case '1': modelType = ProjectModel;
        break;
        case '2': modelType = AcademicModel;
        break;
        case '3': modelType = WorkModel;
        break;
        case '4': modelType = LiteraryModel;
        break;
        case '5': modelType = ArtModel;
        break;
        case '6': modelType = PatentModel;
        break;
        case '7': modelType = ActivityModel;
        break;
      }
      modelType.remove(id, function (err, data) {
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
      status: '已立项',
      setUpDate: req.body.setUpDate
    }
    let id = req.body._id
    let category = req.body.category;
    let modelType = ProjectModel;
      switch(category){
        case '1': modelType = ProjectModel;
        break;
        case '2': modelType = AcademicModel;
        break;
        case '3': modelType = WorkModel;
        break;
        case '4': modelType = LiteraryModel;
        break;
        case '5': modelType = ArtModel;
        break;
        case '6': modelType = PatentModel;
        break;
        case '7': modelType = ActivityModel;
        break;
      }
      modelType.findByIdAndUpdate(id, newStatus, { new: true}, function (err, data) {
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
// 结题操作
app.use('/api/end-one',function(req, res) {
  if(req.body){
    var newStatus = {
      status: '已结题',
      isConclusion: '是'
    }
    let id = req.body._id
    let category = req.body.category;
    let modelType = ProjectModel;
      switch(category){
        case '1': modelType = ProjectModel;
        break;
        case '2': modelType = AcademicModel;
        break;
        case '3': modelType = WorkModel;
        break;
        case '4': modelType = LiteraryModel;
        break;
        case '5': modelType = ArtModel;
        break;
        case '6': modelType = PatentModel;
        break;
        case '7': modelType = ActivityModel;
        break;
      }
      modelType.findByIdAndUpdate(id, newStatus, { new: true}, function (err, data) {
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
    let category = req.body.category;
    let modelType = ProjectModel;
      switch(category){
        case '1': modelType = ProjectModel;
        break;
        case '2': modelType = AcademicModel;
        break;
        case '3': modelType = WorkModel;
        break;
        case '4': modelType = LiteraryModel;
        break;
        case '5': modelType = ArtModel;
        break;
        case '6': modelType = PatentModel;
        break;
        case '7': modelType = ActivityModel;
        break;
      }
    let id = req.body._id
    modelType.findByIdAndUpdate(id, newStatus, { new: true}, function (err, data) {
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