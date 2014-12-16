var gulp = require('gulp');
var del = require('del');

var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var reactify = require('reactify');
var coffeeReactify = require('coffee-reactify');
var coffeeify = require('coffeeify');
var source = require('vinyl-source-stream');

gulp.task('js', function () {
    var app = browserify('./src/js/app.js')
        .transform(reactify)
        .transform(coffeeReactify)
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


return false;
/***********************************************
 ***********************************************
 ***********************************************/
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    coffeelint = require('gulp-coffeelint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    karma = require('gulp-karma'),
    coffee = require('gulp-coffee'),
    ngmin = require('gulp-ngmin');


var testFiles = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'trak-client/js/**/*.coffee',

    'test/*.coffee',

    'trak-client/partials/**/*.html'
];

var paths = {
    index: {
        src: 'trak-client/index.html',
        dist: 'dist/'
    },
    partials: {
        src: 'trak-client/partials/**/*.html',
        dist: 'dist/partials'
    },
    sass: {
        src: 'trak-client/sass/main.sass',
        dist: 'dist/css'
    },
    js: {
        dev: {
            src: [
                'trak-client/js/**/*.coffee',
                '!trak-client/js/config_live.coffee'
            ]
        },
        live: {
            src: [
                'trak-client/js/**/*.coffee',
                '!trak-client/js/config_dev.coffee'
            ]
        },
        dist: 'dist/js'
    },
    vendor_css: {
        src: [

        ],
        dist: 'dist/css'
    },
    vendor_js: {
        src: [  // order is important
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js'
        ],
        src_full: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js'
        ],
        dist: 'dist/js'
    },
    fonts: {
        src: [
            'bower_components/bootstrap/dist/fonts/*'
        ],
        dist: 'dist/fonts'
    }

};


gulp.task('scss', function() {

});

/* SASS */

gulp.task('sass', function() {
    return gulp.src(paths.sass.src)
        .pipe(sass({ style: 'expanded' }))
        .on('error', gutil.log)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.sass.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.sass.dist))
        .pipe(notify({ message: 'Styles task complete' }));
});

/* JS DEV */

gulp.task('js:dev', function() {
    return gulp.src(paths.js.dev.src)
//        .pipe(jshint('.jshintrc'))
//        .pipe(jshint.reporter('default'))
        .pipe(coffee({ bare: true }))
        .on('error', gutil.log)
        .pipe(concat('main.js'))
        .pipe(ngmin())
        .on('error', gutil.log)
        .pipe(gulp.dest(paths.js.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(notify({ message: 'Scripts task complete' }));
});

/* JS LIVE */

gulp.task('js:live', function() {
    return gulp.src(paths.js.live.src)
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe(coffee({ bare: true }))
        .pipe(concat('main.js'))
        .pipe(ngmin())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(notify({ message: 'Scripts task complete' }));
});

/* VENDOR JS */

gulp.task('js:vendor:dev', function() {
    return gulp.src(paths.vendor_js.src_full)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.vendor_js.dist))
});

gulp.task('js:vendor:live', function() {
    return gulp.src(paths.vendor_js.src)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(paths.vendor_js.dist))
});

/* VENDOR CSS */

gulp.task('css:vendor', function() {
    return gulp.src(paths.vendor_css.src)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest(paths.vendor_css.dist))
});

/* MOVE FONTS */

gulp.task('fonts', function() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dist))
});

/* IMAGES */

gulp.task('images', function() {
    // TODO: imagemin + move to dist.
});

/* CLEAN */

gulp.task('clean', function() {
  return gulp.src([paths.sass.dist, paths.js.dist, paths.fonts.dist, paths.partials.dist], {read: false})
    .pipe(clean());
});

/* TESTS */

gulp.task('karma:watch', function() {
    gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});

gulp.task('test', function() {
    // Be sure to return the stream
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

/* WATCH */

gulp.task('watch', function() {
  gulp.watch([paths.index.src, paths.partials.src], ['copy:html']);
  gulp.watch(paths.sass.src, ['sass']);
  gulp.watch(paths.js.dev.src, ['js:dev']);
});

/* DEFAULT */

gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'js:dev', 'js:vendor:dev', 'fonts', 'copy:html', 'karma:watch', 'watch');
});

/* BUILD TO LIVE */

gulp.task('build', ['clean'], function() {
    gulp.start('sass', 'js:live', 'js:vendor:live', 'fonts', 'copy:html');
});

/* Move HTML */

gulp.task('copy:html', function() {
    // TODO: split into live and dev, cache buster for live, update template to reflect choice

    gulp.src(paths.index.src)
        .pipe(gulp.dest(paths.index.dist));
    gulp.src(paths.partials.src)
        .pipe(gulp.dest(paths.partials.dist));
});
