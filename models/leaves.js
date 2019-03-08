const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const leavesSchema = new Schema({  
   title: String,
   autor: String,
   add_time: Date,
  //  meta: {
  //     updateTime: {
  //       type: Date,
  //       default: Date.now()
  //     }
  //   }
})
const leavesModel = mongoose.model('Leaves', leavesSchema)
module.exports = leavesModel