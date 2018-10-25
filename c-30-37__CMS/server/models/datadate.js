const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let datadateSchema = new Schema({
  letter: Date,
  frequency: Number
})

module.exports = mongoose.model('Datadate', datadateSchema);
