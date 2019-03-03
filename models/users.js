const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const UsersSchema = new Schema({
  // _id: Number,
  account: String,
  userName: String,
  password: String,
  role: String,

},{versionKey: false})
const UsersModel = mongoose.model('Users', UsersSchema)
module.exports = UsersModel