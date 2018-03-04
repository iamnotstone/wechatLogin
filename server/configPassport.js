'use strict'
var passport = require('passport'),
//  LocalStrategy = require('passport-local'),
  mongoose = require('mongoose'),
	//users = mongoose.model('users'),
	users = require('./api/models/UsersModel'),
  wechatToken = require('./api/models/WechatToken'),
  WechatStrategy = require('passport-wechat'),
  debug = require('debug')('app:wechat-passport'),
  config = require('config-lite')(__dirname)

module.exports = function(app){
  app.use(passport.initialize())
  //app.use(passport.session())

  var getToken = function(openid, callback){
    wechatToken.findOne({openid:openid}, function(err, result){
      callback(err, result)
    })
  }

  var saveToken = function(openid, token, callback){
    wechatToken.update({openid: openid}, token, {upsert: true}, 
      function(err){
        callback(err) 
      })
  }

  passport.use(
    'wechat',
    new WechatStrategy(
      {
        appID: config.appID,
        name:'wechat',
        appSecret: config.appSecret,
        client: 'shooter',
        callbackURL: '/auth/wechat/callback',
        scope: 'snsapi_userinfo',
        state: '123',
        getToken: getToken,
        saveToken: saveToken
      },
      function(accessToken, refreshToken, profile, expire_in, done) {
        users.findOne({openIdSrc: 'wechat', openId: profile.openid}, 
          function(err, result){
            if(err) return done(err)
            else{
              if(result) done(null, result)
              else{
                var d = new Date()
                var newUser = new users( {
                  nickName: profile.nickname,
                  openId: profile.openid,
                  openIdSrc: 'wechat',
                  sex: profile.sex,
                  language: profile.language,
                  city: profile.city,
                  province: profile.province,
                  country: profile.country,
                  headimgurl: profile.headimgurl,
                  privilege: profile.privilege,
                  unionid: profile.unionid,
                  registrationTime: d
                })
                newUser.save(function(err, result){
                  done(err, result)
                })
              }
            }
        })
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.userId);
  });
 
  passport.deserializeUser(function(id, done) {
    users.findOne({userId: id}, function(err, user){
      done(err, user)
    })
  });

  return passport
}

