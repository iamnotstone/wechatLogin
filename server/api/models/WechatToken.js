'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var WechatTokenSchema = new Schema({
  access_token: String,
  expires_in: Number,
  refresh_token: String,
  openid: String,
  scope: String,
  create_at: String,
  unionid: String
})

module.exports = mongoose.model('wechatToken', WechatTokenSchema)
