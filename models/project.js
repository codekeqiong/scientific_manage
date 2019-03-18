const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const ProjectSchema = new Schema({
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

},{versionKey: false})
const ProjectModel = db.model('Projects', ProjectSchema)
module.exports = ProjectModel