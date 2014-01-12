var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var expect = require('expect.js');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var istanbul = require("gulp-istanbul");

var src = './src/**/*.js';
var tests = './test/tests/**/*.js';

gulp.task('cover', function (cb) {
    gulp.src("./src/**/*.js")
        .pipe(istanbul())
        .on('end', cb);
});

gulp.task('default', function(){
    gulp.run('cover', function () {
        gulp.src([tests], { read: false })
            .pipe(mocha({
                    reporter: 'spec',
                    globals: {
                        expect: expect
                    }
                }))
            .pipe(istanbul.writeReports());
    });

    gulp.src([src, tests])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jscs());
});