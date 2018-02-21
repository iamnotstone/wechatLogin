'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
const findOrCreate = require('mongoose-find-or-create')
var UserSchema = new Schema({
  username: String,
	password: String,
})

UserSchema.methods.validPassword = function(pwd){
  return pwd == this.password
}
UserSchema.plugin(findOrCreate)


module.exports = mongoose.model('users', UserSchema)
