const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const PatentSchema = new Schema({
  
},{versionKey: false})
const PatentModel = db.model('Patent', PatentSchema)
module.exports = PatentModel