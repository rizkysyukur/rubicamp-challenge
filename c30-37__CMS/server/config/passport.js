const LocalStrategy = require('passport-local').Strategy;
const passport = requere('passport');

const user = require('../models/user');


module.export = function(){
  passport.serializeUser(function(user, done){
    done(null, user)
  })
}
