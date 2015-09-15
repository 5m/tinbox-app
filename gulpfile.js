var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var debowerify = require('debowerify');


gulp.task('js', function () {
    compileScripts();
});

function distPath() {
    var base = process.env.STATIC_BASE || 'dist';
    var args = Array.prototype.slice.call(arguments);

    var paths = [base].concat(args);

    return path.join.apply(path, paths);
}


function handleErrors() {
    var args = Array.prototype.slice.call(arguments);

    $.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);

    gutil.log.apply(this, args);

    this.emit('end'); // Keep gulp from hanging on this task
}


function compileScripts(watch) {
    var entry = './src/start.js';
    var options = {
        paths: ['./src'],
        transform: [
            ["reactify", {es6: true}]
        ]
    };

    var bundler = browserify(entry, options);

    if (watch) {
        bundler = watchify(bundler, watchify.args);
    }

    return bundler
        .transform(reactify)
        .transform(debowerify)
        .bundle()
        .on('error', handleErrors)
        .pipe(source('trak.js'))
        .pipe(buffer())
        .pipe($.size({showFiles: true}))
        .pipe(gulp.dest(distPath('js')))
        .pipe($.notify())
        .on('error', gutil.log);
}


gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/**.*')
        .pipe($.size({showFiles: true}))
        .pipe(gulp.dest(distPath('fonts')))
});


gulp.task('scss', function () {
    return gulp.src('./src/scss/trak.scss')
        .pipe($.sass({
            outputStyle: 'compressed',
            precision: 10,
            includePaths: [
                'bower_components',
                'src',
                'node_modules'
            ]
        }).on('error', handleErrors))
        .pipe($.notify())
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(distPath('css')))
        .pipe($.size({showFiles: true}));
});


gulp.task('html', function () {
    var config = require('./src/config.js');

    return gulp.src('src/index.html')
        .pipe($.template(config))
        .pipe(gulp.dest(distPath()))
        .pipe($.size({showFiles: true})).on('error', gutil.log);
});


gulp.task('watch', function () {
    gulp.watch('src/**/*.{js,coffee}', ['js']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/**.html', ['html']);
    gulp.watch('node_modules/font-awesome/fonts/**.*', ['fonts']);
});


gulp.task('build', function () {
    process.env['DISABLE_NOTIFIER'] = 'true';
    gulp.start('js', 'scss', 'html', 'fonts');
});


gulp.task('default', function () {
    gulp.start('js', 'scss', 'html', 'fonts', 'watch');
});
