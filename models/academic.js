const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const AcademicSchema = new Schema({
  
},{versionKey: false})
const AcademicModel = db.model('Academic', AcademicSchema)
module.exports = AcademicModel