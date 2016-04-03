module.exports = function(gulp, config, plugins) {
    'use strict';

    var babelify = require('babelify'),
        browserify = require('browserify'),
        buffer = require('vinyl-buffer'),
        errorHandler = require('../../helpers/error-handler')(plugins),
        props = {
            entries: [config.resources.scriptsMain],
            debug: true,
            transform: [babelify.configure({ presets : ["es2015"] })],
            outputName: 'app.min.js'
        },
        source = require('vinyl-source-stream');

    return function() {
        browserify(props).bundle()
            .on('error', errorHandler())
            .pipe(plugins.plumber(config.options.plumber))
            .pipe(source('app.min.js'))
            .pipe(buffer())
            .pipe(plugins.uglify())
                .on('error', errorHandler())
            .pipe(plugins.plumber.stop())
            .pipe(gulp.dest(config.output.scripts))
            .pipe(reload({stream:true}));
    };
};
