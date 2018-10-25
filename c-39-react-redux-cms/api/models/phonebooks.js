const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dataSchema = new Schema({
  id: Number,
  name: String,
  phone: String
})


module.exports = mongoose.model('Phonebooks', dataSchema);
