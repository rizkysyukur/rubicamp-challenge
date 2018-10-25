const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: String,
  password: String,
  retypepassword: String
})

module.exports = mongoose.model('User', userSchema);
