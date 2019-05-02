const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const UsersSchema = new Schema({
  // _id: Number,
  account: String,
  userName: String,
  password: String,
  role: String,
  sex: String,
  second_College: String,
  native_Place: String,
  education: String,
  phone: Number,
  createDate: {
    type: Date,
    default: Date.now()
  }
},{versionKey: false})
const UsersModel = db.model('Users', UsersSchema)
module.exports = UsersModel