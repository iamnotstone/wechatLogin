'use strict'
var path = require('path');
//var itemController = require('../controllers/ItemController');
var modelController = require('../controllers/ModelController')
var documentController = require('../controllers/DocumentController')
var moduleController = require('../controllers/ModuleController')
const { check, validationResult } = require('express-validator/check');
const homePath = process.env.NODE_ENV == 'production' ? './client/dist/html/index.html':
                  './client/dist/html/index.html'


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please login first!';
  res.redirect('/login');
}
//todo: implement validator for all request
module.exports = function(app, passport){
/*
  app.route('/')
	  .get(function(req,res){
		  if(req.isAuthenticated()) res.redirect('/cad')
			else
				res.redirect('/login')
		}) */
	/*app.route('/login_user')
	  .get(passport.authenticate('local', {
		  successRedirect: '/cad',
			failureRedirect: '/login',
			failureFlash: false
	}))*/
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
	app.route('/getModels')
		.get(/*ensureAuthenticated,*/modelController.getModels);

  app.route('/loadModule/*')
    .get(moduleController.loadModule)

  app.route('/loadModel/*')
    .get( moduleController.loadModel)

	app.route('/getDocuments')
		.get(documentController.getDocuments);

  app.route('/cad')
    .get(function(req,res){
      res.sendFile(path.resolve('./client/dist/html/cad.html'))
    })

	app.route('/*')
		.get(function(req,res){
			res.sendFile(path.resolve(homePath));
		});
/*
	app.route('/cad')
		.get(ensureAuthenticated ,function(req,res){
			res.sendFile(path.resolve(cadPath));
		});

  app.route('/login')
	  .get(function(req,res){
		  res.sendFile(path.resolve('./client/dist/html/login.html'))
		})

	app.route('/getModels')
		.get(ensureAuthenticated,modelController.getModels);

	app.route('/insertModel')
		.post(ensureAuthenticated, modelController.insertModel);

	app.route('/createDocument')
		.post(ensureAuthenticated, documentController.createDocument);

	app.route('/getDocuments')
		.get(ensureAuthenticated, documentController.getDocuments);

	app.route('/openDocument')
		.post(ensureAuthenticated, documentController.getDocument);

	app.route( '/modifyParameters')
		.post(ensureAuthenticated, [check('documentId').exists(), check('entities').exists()], 
			documentController.modifyParameters);

	app.route('/login_user')
	  .get(passport.authenticate('local', {
		  successRedirect: '/cad',
			failureRedirect: '/login',
			failureFlash: false
		}))

  app.route('/loadModule/*')
    .get(ensureAuthenticated, moduleController.loadModule)

  app.route('/loadModel/*')
    .get(ensureAuthenticated, moduleController.loadModel)
*/
  
}
