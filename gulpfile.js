var dotenv = require('dotenv');
dotenv.load();

var path = require('path');
var requireUncached = require('require-uncached');
var _ = require('lodash');

var gulp = require('gulp');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var debowerify = require('debowerify');

var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var WebpackDevServer = require('webpack-dev-server');

var notify = $.notify({hint: 'int:transient:1'})


global.FORCE_IS_PRODUCTION = false;
global.IS_PRODUCTION = FORCE_IS_PRODUCTION || undefined;

global.HTML_ENTRY_POINT = undefined;

global.WEBPACK_STREAM_WATCH = false;
global.WEBPACK_CONFIG_FILE = './webpack.config.js';

global.APP_CONFIG = undefined;

var webpackCompileOptions = {
    progress: false,
    stats: {
        colors: gutil.colors.supportsColor,
        hash: true,
        version: true,
        timings: true,
        cached: true
    },
    devServer: {
        listen: {
            port: 3000,
            host: 'localhost'
        },
        hot: true,
        quiet: false
    }
}


function reloadConfig() {
    'use strict';
    dotenv.load();

    global.IS_PRODUCTION = FORCE_IS_PRODUCTION
        || 'production' == process.env.NODE_ENV

    global.APP_CONFIG = requireUncached('./src/config.js')

    global.APP_CONFIG.DEBUG = !IS_PRODUCTION

    if (IS_PRODUCTION) {
        global.HTML_ENTRY_POINT = path.join(
            global.APP_CONFIG.app_base || '/',
            'js/tinbox.min.js'
        )
    } else {
        // Link to webpack-dev-server
        global.HTML_ENTRY_POINT = 'http://localhost:3000/js/trak-dev.js'
    }
}

reloadConfig();


function distPath() {
    var base = process.env.STATIC_BASE || 'dist';
    var args = Array.prototype.slice.call(arguments);

    var paths = [base];

    if (args.length) {
        paths = paths.concat(args);
    }

    var result = path.join.apply(path, paths);
    gutil.log('distPath', arguments, ' => ', result);
    return result;
}


function handleErrors() {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);

    gutil.log.apply(this, args);

    this.emit('end'); // Keep gulp from hanging on this task
}

var webpackConfig = {
    dev: function webpackConfig_dev(config) {
        config.debug = true;
        if (!IS_PRODUCTION !== config.debug) {
            throw new gutil.PluginError('tinbox-conf',
                'IS_PRODUCTION is not false, I will not use the dev config' +
                ' for production.');
        }

        var plugins = config.plugins || [];

        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
            DEBUG: !IS_PRODUCTION
        }));

        config.plugins = plugins;

        return config;

    },
    prod: function webpackConfig_prod(config) {
        config.entry = ['./src/start'];
        config.output.path = distPath();
        config.output.filename = path.join('js', 'tinbox.min.js');

        config.plugins = [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ];

        return config;
    }
}

function getWebpackConfig() {
    var config = _.merge({}, requireUncached('./webpack.config.js'));

    if (IS_PRODUCTION) {
        config = webpackConfig.prod(config);
    } else {
        config = webpackConfig.dev(config);
    }

    return config;
}


function compileScriptsWebpack(callback) {
    var config = getWebpackConfig();
    var webpackCallback;

    if (IS_PRODUCTION) {
        webpackCallback = function (err, stats) {
            if (err) {
                throw new gutil.PluginError('webpack', err);
            }
            gutil.log('[webpack]', stats.toString(webpackCompileOptions.stats));
            callback();
        };
    }

    var compiler = webpack(config, webpackCallback);

    if (webpackCompileOptions.progress) {
        compiler.apply(new webpack.ProgressPlugin(function (percentage, msg) {
            percentage = Math.floor(percentage * 100);
            msg = percentage + '% ' + msg;
            if (percentage < 10) msg = ' ' + msg;
            gutil.log('webpack', msg);
        }));
    }

    if (!IS_PRODUCTION) {
        var serverConfig = _.merge({}, webpackCompileOptions.devServer);
        var listenConfig = serverConfig.listen;
        delete serverConfig.listen;

        new WebpackDevServer(compiler, serverConfig)
            .listen(listenConfig.port, listenConfig.host, function (err) {
                if (err) {
                    throw new gutil.PluginError('webpack-dev-server', err);
                }

                gutil.log('[webpack-dev-server]',
                    'Watching scripts and running on http://'
                    + listenConfig.host + ':' + listenConfig.port);
            })
    }
}


var compileScripts = compileScriptsWebpack;

// Alias js => js:app
gulp.task('js', ['js:app']);

gulp.task('js:app', ['js:jquery'], function (callback) {
    reloadConfig();
    compileScripts(callback);
});

gulp.task('js:jquery', function () {
    return gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe($.size({showFiles: true}))
        .pipe(gulp.dest(distPath('js')))
});


gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/**.*')
        .pipe($.size({showFiles: true}))
        .pipe(gulp.dest(distPath('fonts')))
});


gulp.task('scss', function () {
    reloadConfig();
    return gulp.src('./src/scss/main.scss')
        .pipe($.sass({
            outputStyle: IS_PRODUCTION ? 'compressed' : 'expanded',
            precision: 10,
            includePaths: [
                'bower_components',
                'src',
                'node_modules'
            ]
        }).on('error', handleErrors))
        .pipe(notify)
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(distPath('css')))
        .pipe($.size({showFiles: true}));
});


gulp.task('html', function () {
    reloadConfig();

    var config = _.merge({}, global.APP_CONFIG);
    config.entry_point = HTML_ENTRY_POINT;
    gutil.log('html template context', config);

    return gulp.src('src/index.html')
        .pipe($.template(config))
        .pipe(gulp.dest(distPath()))
        .pipe($.size({showFiles: true})).on('error', gutil.log);
});

// Alias to build the app in the correct order
gulp.task('app', ['js', 'scss', 'html']);


gulp.task('watch', function () {
    // Rebuild entire app if .env changes
    gulp.watch('.env', ['app']);

    if (IS_PRODUCTION) {
        // Webpack's devserver handles this in non-production
        gulp.watch('src/**/*.{js,coffee}', ['js']);
    }

    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/**.html', ['html']);
    gulp.watch('node_modules/font-awesome/fonts/**.*', ['fonts']);
});


gulp.task('build', function () {
    global.FORCE_IS_PRODUCTION = true;
    process.env['DISABLE_NOTIFIER'] = 'true';
    gulp.start('js', 'scss', 'html', 'fonts');
});


gulp.task('default', function () {
    global.WEBPACK_STREAM_WATCH = true;
    gulp.start('app', 'watch');
});
