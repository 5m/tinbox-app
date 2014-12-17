var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');

var browserify = require('browserify');
var reactify = require('reactify');
var coffeeify = require('coffeeify');


gulp.task('js', function () {
    var app = browserify({
        entries: ['./src/index.js'],
        paths: ['./node_modules', './src', './src/components']
    })
        .transform(coffeeify)
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function () {
    return gulp.src('./src/**.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.{js,coffee}', ['js']);
    gulp.watch('./src/**.html', ['html']);
});

gulp.task('default', function () {
    gulp.start('js', 'html', 'watch');
});