const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const PersonInfoSchema = new Schema({
  account: String,
  account_name: String,
  role: String,
  sex: String,
  second_College: String,
  native_Place: String,
  education: String,
  birth_date: Date,
  phone: Number,
},{versionKey: false})

const PersonInfoModel = db.model('PersonInfo', PersonInfoSchema)
module.exports = PersonInfoModel