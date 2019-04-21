const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const ActivitySchema = new Schema({
  projectName: String,
  account: String,
  userName: String,
  second_college: String,
  keywords: String,
  type: String,
  field: String,
  approval: String,
  createDate: {
    type: Date,
    default: Date.now()
  },
  endTime: Date,
  phone: Number,
  remarks: String,
  status: String,
  isConclusion: String,
  category: String,
  scores: String
},{versionKey: false})
const ActivityModel = db.model('Activity', ActivitySchema)
module.exports = ActivityModel