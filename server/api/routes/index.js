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

  app.route('/auth/wechat/callback')
    .get(function(req, res, next){
      passport.authenticate('wechat', {session: false},function(err, user, info){
        if(err) {return next(err)}
        if(!user) {return res.json({loginResult: false})}
        res.json({
          loginResult: true,
          userInfo: {
            nickName: user.nickName,
            headimgurl: user.headimgurl
          }
        })

      })(req, res, next)
    }) 
}
