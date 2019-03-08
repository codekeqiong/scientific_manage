# scientific科研管理系统
home_page: 公告+轮播特效（加上学院官网的跳转链接）

#科研项目管理
1.科研项目申报
2.科研项目查询
3.科研项目审批（管理员权限）

#科研分数统计

#留言管理
1.查看留言详情
2.留言列表：添删查

#个人信息管理
1.完善个人信息
2.修改密码

#系统设置（教师没有此权限）
1.查询用户信息
2.新增用户信息
3.修改用户信息
4.删除用户信息

#字段设计：
// 留言列表
leaves:{
  "leaveId": Number,
  "leaveTitle": String,
  "autor": String,
  "add_time": String 
}

// 添加留言
add_leave:{
  "leaveTitle": String,
  "content": String
}

// 个人信息
user_info{
  "userId": Number,
  "account": Number,
  "accountName": Number,
  "sex": String,
  "secondCollege": String,
  "nativePlace": String,
  "education": String,
  "birthDate": Number,
  "phone": Number
}

// 用户管理
users:{
  "usersId": Number,
  "account": Number,
  "userName": String,
  "password": Number,
  "role": String
}

// 登录 管理员admin
login:{
  "loginId": Number,
  "account": Number,
  "userName": String,
  "role": String
}

// 项目申报
projects:{
  projectName: String,
  userName: String,
  second_college: String,
  keywords: String,
  abstract: String,
  field: String,
  approval: String,
  fund: Number,
  createDate: {
    type: Date,
    default: Date.now()
  },
  endTime: Date,
  phone: Number,
  remarks: String,
  status: String,
}

// 项目查询
query:{
  "projectId": Number,
  "projectName": String,
  "userName": String,
  "role": String,
  "second_college": String,
  "phone": Number,
  "add_time": Number,
  "status": String,
}

// 项目审批
approval:{
  "projectId": Number,
  "projectName": String,
  "userName": String,
  "role": String,
  "second_college": String,
  "phone": Number,
  "add_time": Number
}
 