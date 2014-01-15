var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var watch = require('gulp-watch');

var src = './src/**/*.js';
var tests = './test/tests/**/*.js';

gulp.task('test', function () {
    gulp.src(tests, { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('lint', function() {
    gulp.src([src, tests])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jscs())
        .on('error', gutil.log);
});

gulp.task('default', function(){
    gulp.run('test');
    gulp.run('lint');
});

gulp.task('watch', function() {
    gulp.src([src, tests], { read: false })
        .pipe(watch(function(events, cb) {
            gulp.run('default', cb);
        }));
});
