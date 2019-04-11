const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../config/db')
const ArtSchema = new Schema({
  
},{versionKey: false})
const ArtModel = db.model('Art', ArtSchema)
module.exports = ArtModel