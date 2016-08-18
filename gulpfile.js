var gulp = require('gulp');
var webpack = require('gulp-webpack');
var connect = require('gulp-connect');
var open = require('gulp-open');

var webpackConfig = require('./webpack.config.js');
var config = {
  host: '127.0.0.1',
  port: 8888,
  path: '/example/index.html',
  livereload: true
};
// 默认
gulp.task('default', ['server', 'webpack']);
// 启动服务器
gulp.task('server', function () {
  connect.server(config);
  gulp.src('').pipe(open({ uri: 'http://' + config.host + ':' + config.port + config.path })); // 打开浏览器
});

// webpack 
gulp.task('webpack', function () {
  webpackConfig.watch = true;
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// 编译
gulp.task('dist', function () {
  webpackConfig.optimize.minimize = true;
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(''));
});