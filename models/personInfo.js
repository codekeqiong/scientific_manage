const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const PersonInfoSchema = new Schema({
  account: String,
  accountName: String,
  sex: String,
  second_College: String,
  native_Place: String,
  education: String,
  birthDate: Date,
  phone: Number,
},{versionKey: false})

const PersonInfoModel = db.model('PersonInfo', PersonInfoSchema)
module.exports = PersonInfoModel