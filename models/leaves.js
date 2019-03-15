const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const leavesSchema = new Schema({  
  title: String,
  autor: String,
  content: String,
  add_time: {
    type: Date,
    default: Date.now()
  }
})
const leavesModel = mongoose.model('Leaves', leavesSchema)
module.exports = leavesModel