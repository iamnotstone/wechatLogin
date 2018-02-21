'use strict'
var LocalStrategy = require('passport-local'),
  mongoose = require('mongoose'),
	users = mongoose.model('users'),
  WechatStrategy = require('passport-wechat'),
  debug = require('debug')('wechat-passport')
exports.configPassport = function(passport){

  getToken = function(){
    debug('getToken')
  }

  saveToken = function(){
    debug('saveToken')
  }

  passport.use(
    'wechat',
    new WechatStrategy(
      {
        appID: 'APPID',
        name:'wechat',
        appSecret: 'APPSECRET',
        client: 'shooter',
        callbackURL: '/auth/wechat/callback',
        scope: 'snsapi_userinfo',
        state: '123',
        getToken: getToken,
        saveToken: saveToken
      },
      function(accessToken, refreshToken, profile, done) {
        debug('profile:', profile)
        users.findOrCreate({username: 'username'}, {profile: 'profile'}, function(err, result){
          if(err) debug('findOrCreate.err:', err)
          else debug('findOrCreate.result:', result)
          done(err, result)
        })
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
 
  passport.deserializeUser(function(id, done) {
    users.findOne({username:id}, function(err, user){
      done(err, user)
    })
  });
}

