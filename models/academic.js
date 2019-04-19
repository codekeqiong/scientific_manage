const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const AcademicSchema = new Schema({
  projectName: String,
  account: String,
  userName: String,
  second_college: String,
  tutor: String,
  keywords: String,
  field: String,
  approval: String,
  createDate: {
    type: Date,
    default: Date.now()
  },
  endTime: Date,
  phone: Number,
  status: String,
  isConclusion: String,
  category: String,
  scores: String,
  remarks: String
},{versionKey: false})
const AcademicModel = db.model('Academics', AcademicSchema)
module.exports = AcademicModel