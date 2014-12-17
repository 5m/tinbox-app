var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var reactify = require('reactify');
var coffeeReactify = require('coffee-reactify');
var coffeeify = require('coffeeify');
var es6Class = require('es6-class');


gulp.task('js', function () {
    var app = browserify('./src/js/app.js')
        .transform(coffeeify)
        .transform(reactify)
        .transform(es6Class)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function () {
    return gulp.src('./src/**.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/js/**', ['js']);
    gulp.watch('./src/**.html', ['html']);
});

gulp.task('default', function () {
    gulp.start('js', 'html', 'watch');
});