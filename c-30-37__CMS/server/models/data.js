const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dataSchema = new Schema({
  letter: String,
  frequency: Number
})

module.exports = mongoose.model('Data', dataSchema);
