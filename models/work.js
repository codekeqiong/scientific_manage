const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const WorkSchema = new Schema({
  
},{versionKey: false})
const WorkModel = db.model('Work', WorkSchema)
module.exports = WorkModel