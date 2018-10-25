const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mapsSchema = new Schema({
  title: String,
  lat: Number,
  lng: Number
})

module.exports = mongoose.model('Maps', mapsSchema);
