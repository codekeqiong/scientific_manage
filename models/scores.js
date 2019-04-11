const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../config/db')
const ScoresSchema = new Schema({
  projectName: String,
  account: String,
  userName: String,
  declareScore: Number,
  setUpScore: Number,
  conclusionScore: Number,
  kindsScores: Number,
  number: Number,
  fund: Number,
  unConclusionScore: Number,
  terminatedDeduct: Number,
  totalScore: Number,
},{versionKey: false})
const ScoresModel = db.model('Scores', ScoresSchema)
module.export = ScoresModel
