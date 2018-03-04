var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
  session = require('./session'),
  compression = require('compression'),
  helmet = require('helmet'),
  fs = require('fs'),
  config = require('config-lite')(__dirname),
  debug = require('debug')('app:server')
  db = require('./api/mongodb/db')


var app = express(),
    port = process.env.PORT || 3000

app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//app.use(session())

//config passport
var configPassport = require('./configPassport')
var passport = configPassport(app)

var routes = require('./api/routes/index');
routes(app, passport);

app.listen(config.port, function(){
  debug('start listen port', config.port)
})


