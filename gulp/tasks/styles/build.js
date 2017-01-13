module.exports = function(gulp, config, plugins) {
    'use strict';

    var path         = require('path'),
        errorHandler = require('../../helpers/error-handler')(plugins),
        browserSync  = require('browser-sync').get('browserSync');

    return function() {
        return gulp.src(config.src.styles)
            .pipe(config.production ? plugins.util.noop() : plugins.sourcemaps.init())
            .pipe(plugins.sass(config.options.scss))
                .on('error', errorHandler())
            .pipe(plugins.autoprefixer(config.options.autoprefixer))
            .pipe(plugins.rucksack(config.options.rucksack))
            .pipe(plugins.cssnano())
            .pipe(config.production ? plugins.util.noop() : plugins.sourcemaps.write())
            .pipe(gulp.dest(path.resolve(config.dist.base, config.dist.styles)))
            .pipe(browserSync.stream());
    };
};
