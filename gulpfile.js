var gulp = require('gulp');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var reactify = require('reactify');
var coffeeify = require('coffeeify');
var es6Class = require('es6-class');


gulp.task('js', function () {
    var app = browserify('./src/index.js',
        {
            paths: ['./src', './src/components']
        })
        .transform(coffeeify)
        .transform(reactify)
        .bundle().on('error', gutil.log)
        .pipe(source('trak.js'))
        .pipe(gulp.dest('dist/js'))
        .on('error', gutil.log);
});

gulp.task('scss', function () {
    return gulp.src('./src/scss/trak.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['bower_components']
        })).on('error', gutil.log)
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe($.size());
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/'))
        .pipe($.size()).on('error', gutil.log);
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/**/*.{js,coffee}', ['js']);
    gulp.watch('src/**.html', ['html']);
});

gulp.task('default', function () {
    gulp.start('js', 'scss', 'html', 'watch');
});