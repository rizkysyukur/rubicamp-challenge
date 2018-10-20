const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dataSchema = new Schema({
  id: Number,
  title: String,
  rate: Number,
  description: String,
  price: Number,
  brand: String,
  detailProduct: String
})

module.exports = mongoose.model('Product', dataSchema);
