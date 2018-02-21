'use strict'
var path = require('path');
//var itemController = require('../controllers/ItemController');
const { check, validationResult } = require('express-validator/check');


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please login first!';
  res.redirect('/login');
}
module.exports = function(app, passport){
  app.route('/login_user')
    .get(function(req,res,next){
      passport.authenticate('local', function(err, user, info){
        if(err) {return next(err)}
        if(!user) {return res.json({loginResult: false, msg: '错误的用户名或者密码'})}
        req.logIn(user, function(err){
          if(err) {return next(err)}
          return res.json({loginResult: true})
        })
      })(req, res, next)
    })

  app.route('/auth/wechat/callback')
    .get(function(req, res, next){
      passport.authenticate('wechat', function(err, user, info){
        if(err) {return next(err)}
        if(!user) {return res.json({loginResult: false})}
        req.logIn(user, function(err){
          if (err) {return next(err)}
          return res.json({loginResult: true})
        })
      })(req, res, next)
    }) 
}
