var gulp = require('gulp');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var es6ify = require('es6ify');


// XXX: Not sure why this is necessary
//var requiredFiles = './node_modules/react/react.js';

gulp.task('js', function () {
    compileScripts();
});


function compileScripts(watch) {
    //es6ify.traceurOverrides = {experimental: true};

    var entry = './src/index.js',
        options = {
            paths: ['./src']
        },
        bundler = browserify(es6ify.runtime, options);

    if (watch) {
        bundler = watchify(bundler, watchify.args);
    }

    return bundler.add(entry)
        .transform(reactify)
        .transform(es6ify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('trak.js'))
        .pipe(buffer())
        .pipe($.size({showFiles: true}))
        .pipe(gulp.dest('dist/js'))
        .on('error', gutil.log);
}

gulp.task('scss', function () {
    return gulp.src('./src/scss/trak.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['bower_components']
        }).on('error', gutil.log))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe($.size({showFiles: true}));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/'))
        .pipe($.size({showFiles: true})).on('error', gutil.log);
});

gulp.task('watch', function () {
    // compileScripts(true); // watch
    gulp.watch('src/**/*.{js,coffee}', ['js']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/**.html', ['html']);
});

gulp.task('default', function () {
    gulp.start('js', 'scss', 'html', 'watch');
});