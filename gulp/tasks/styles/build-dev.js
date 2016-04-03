module.exports = function(gulp, config, plugins) {
    'use strict';

    var fs = require('fs'),
        errorHandler = require('../../helpers/error-handler')(plugins);

    return function() {
        return gulp.src(config.resources.styles)
            .pipe(plugins.plumber(config.options.plumber))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass(config.options.scss))
                .on('error', errorHandler())
            .pipe(plugins.cssnano())
            .pipe(plugins.rename(config.options.rename))
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.plumber.stop())
            .pipe(gulp.dest(config.output.styles));
    };
};
