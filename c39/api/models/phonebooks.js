const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dataSchema = new Schema({
  name: String,
  phone: String
})


module.exports = mongoose.model('Phonebooks', dataSchema);
