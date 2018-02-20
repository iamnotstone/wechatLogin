var gulp = require('gulp');
var webpack = require('webpack-stream');
var origin_webpack = require('webpack');
var del = require('del');
var runSequence = require('run-sequence');
var path = require('path');
var shell = require('gulp-shell')

gulp.task('clean',function(){
	del(['./client/www/js/*.js', './client/www/js/*.map']);

});


gulp.task('transpile',function(){
  let webpack_config = './webpack.config.js'
	return gulp.src('./client/src/index.js')
	.pipe(webpack(require(webpack_config), origin_webpack))
	.pipe(gulp.dest('./client/www/js/'));
})

gulp.task('build',function(callback){
	runSequence('clean',['transpile'],callback)
})

gulp.task('android',shell.task([
  'cd client && cordova run android && cd ../'
]))


