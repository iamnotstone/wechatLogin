'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
const findOrCreate = require('mongoose-find-or-create')
var UserSchema = new Schema({
  userName: String,
	userId: String,
  userGroup: {
    type: String,
    default: 'User' // {User|Manager}
  },
  registrationTime: Date
})

UserSchema.plugin(findOrCreate)


module.exports = mongoose.model('users', UserSchema)
