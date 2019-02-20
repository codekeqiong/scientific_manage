const mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
  _id: Number,
  account: Number,
  userName: String,
  password: Number,
  role: String,
  meta: {
    createTime: {
      type: Date,
      default: Date.now()
    },
    updateTime: {
      type: Date,
      default: Date.now()
    }
  }
})

//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
})

//查询的静态方法  Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等
UsersSchema.statics = {
  fetch: function(cb) { //查询所有数据
    return this
      .find()
      .sort('meta.updateAt') //排序
      .exec(cb) //回调
  },
  findById: function(id, cb) { //根据id查询单条数据
    return this
      .findOne({_id: id})          
      .exec(cb)
  }
}
//暴露出去的方法
module.exports = UsersSchema