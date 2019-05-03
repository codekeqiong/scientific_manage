const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const UsersSchema = new Schema({
  account: String,
  userName: String,
  password: String,
  role: String,
  sex: String,
  second_college: String,
  native_place: String,
  education: String,
  phone: Number,
  email: String,
  createDate: {
    type: Date,
    default: Date.now()
  }
},{versionKey: false})
const UsersModel = db.model('Users', UsersSchema)
module.exports = UsersModel