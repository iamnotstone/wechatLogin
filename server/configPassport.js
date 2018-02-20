'use strict'
var LocalStrategy = require('passport-local'),
  mongoose = require('mongoose'),
	users = mongoose.model('users')

exports.configPassport = function(passport){

  passport.use(new LocalStrategy(
    function(username, password, done) {
      users.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
 
  passport.deserializeUser(function(id, done) {
    done(null, {username:id});
  });
}

