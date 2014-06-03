var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    ngmin = require('gulp-ngmin');


var paths = {
    sass: {
        src: 'static/sass/main.sass',
        dist: 'static/dist/css'
    },
    js: {
        dev: {
            src: [
                'static/js/**/*.js',
                '!static/js/config_live.js'
            ]
        },
        live: {
            src: [
                'static/js/**/*.js',
                '!static/js/config_dev.js'
            ]
        },
        dist: 'static/dist/js'
    },
    vendor_css: {
        src: [
            'static/vendor/css/bootstrap.min.css'
        ],
        dist: 'static/dist/css'
    },
    vendor_js: {
        src: [  // order is important
            'static/vendor/js/jquery.min.js',
            'static/vendor/js/bootstrap.min.js',
            'static/vendor/js/angular.min.js',
            'static/vendor/js/angular-animate.min.js',
            'static/vendor/js/angular-ui-router.min.js',
            'static/vendor/js/ui-bootstrap-tpls.min.js'
        ],
        dist: 'static/dist/js'
    },
    fonts: {
        src: 'static/vendor/fonts/*',
        dist: 'static/dist/fonts'
    }

};

/* SASS */

gulp.task('sass', function() {
    return gulp.src(paths.sass.src)
        .pipe(sass({ style: 'expanded' }))
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
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(ngmin())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(notify({ message: 'Scripts task complete' }));
});

/* JS LIVE */

gulp.task('js:live', function() {
    return gulp.src(paths.js.live.src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(ngmin())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dist))
        .pipe(notify({ message: 'Scripts task complete' }));
});

/* VENDOR JS */

gulp.task('js:vendor', function() {
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
  return gulp.src([paths.sass.dist, paths.js.dist, paths.fonts.dist], {read: false})
    .pipe(clean());
});

/* WATCH */

gulp.task('watch', function() {
  gulp.watch(paths.sass.src, ['sass']);
  gulp.watch(paths.js.src, ['js']);
});

/* DEFAULT */

gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'js:dev', 'js:vendor', 'css:vendor', 'fonts');
});

/* BUILD TO LIVE */

gulp.task('build', ['clean'], function() {
    gulp.start('sass', 'js:live', 'js:vendor', 'css:vendor', 'fonts');
});

