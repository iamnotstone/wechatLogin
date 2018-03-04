var mongoose = require('mongoose'),
  config = require('config-lite')(__dirname),
  debug = require('debug')('app:mongoose'),
  autoIncrement = require('mongoose-auto-increment')
mongoose.connect(config.url)
mongoose.Promise = global.Promise

const db = mongoose.connection
autoIncrement.initialize(mongoose)
db.once('open' ,() => {
  debug('mongodb opened')
})

db.on('error', function(error) {
    debug('mongodb error')
    mongoose.disconnect();
});

db.on('close', function() {
    debug('mongodb disconnected, start to reconnect...')
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

module.exports = db
