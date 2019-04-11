const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const ActivitySchema = new Schema({
  
},{versionKey: false})
const ActivityModel = db.model('Activity', ActivitySchema)
module.exports = ActivityModel