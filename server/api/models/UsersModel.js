'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')

var UserSchema = new Schema({
  nickName: String,
	openId: String,
  userGroup: {
    type: String,
    default: 'User' // {User|Manager}
  },
  sex: Number,
  openIdSrc: String,
  language: String,
  city: String,
  province: String,
  country: String,
  headimgurl: String,
  privilege: [String],
  unionid: String,
  registrationTime: Date,
  userId: String,
})


UserSchema.plugin(autoIncrement.plugin, {
  model: 'users',
  field: 'userId'
})



module.exports = mongoose.model('users', UserSchema)
