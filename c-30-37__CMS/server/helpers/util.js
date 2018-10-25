const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
  token: (email, password, secret, expires)=>{
    return jwt.sign({
      email: email,
      password: password
    }, secret, {
      expiresIn: expires
    })
  },
  decoded: (token, secret, cb) =>{
    jwt.verify(token, secret, (err, decoded)=>{
      if(err){
        cb(false);
      }else{
        User.findOne({
          email: decoded.email,
          password: decoded.password
        }).then(user=>{
          if(!user){
            cb(false);
          }else{
          }
            cb(true)
        })
      }
    })
  },
  formatDate: function(dateString){
    let date = new Date(dateString);

    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    // YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }
}
