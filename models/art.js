const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const ArtSchema = new Schema({
  projectName: String,
  account: String,
  userName: String,
  second_college: String,
  keywords: String,
  artArea: String,
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
const ArtModel = db.model('Art', ArtSchema)
module.exports = ArtModel