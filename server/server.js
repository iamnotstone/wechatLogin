var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
  session = require('express-session'),
	passport = require('passport'),
  compression = require('compression'),
  helmet = require('helmet'),
  fs = require('fs'),
  debug = require('debug')('server')

//  var http = require('http').Server(app)

var users = require('./api/models/UsersModel')



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/wechatlogin');


app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({secret:'supernova', saveUninitialized: true, resave: true}))
app.use(passport.initialize())
app.use(passport.session())

//config passport
var configPassport = require('./configPassport')
configPassport.configPassport(passport)

var routes = require('./api/routes/routes');
routes(app, passport);




