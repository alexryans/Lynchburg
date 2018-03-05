module.exports = function(gulp, config, plugins) {
    'use strict';

    const autoprefixer = require('autoprefixer');
    const browserSync  = require('browser-sync').get('browserSync');
    const cssnano      = require('cssnano');
    const errorHandler = require('../../helpers/error-handler')(plugins);
    const path         = require('path');
    const postcss      = require('gulp-postcss');
    const rucksack     = require('rucksack-css');

    return function() {
        return gulp.src(config.src.styles)
            .pipe(config.production ? plugins.util.noop() : plugins.sourcemaps.init())
            .pipe(plugins.sass(config.options.scss).on('error',
                config.production ? error => { throw Error(error); } : errorHandler())
            )
            .pipe(postcss([
                autoprefixer(config.options.autoprefixer),
                rucksack(config.options.rucksack),
                cssnano(config.options.cssnano)
            ]))
            .pipe(config.production ? plugins.util.noop() : plugins.sourcemaps.write())
            .pipe(gulp.dest(path.resolve(config.dist.base, config.dist.styles)))
            .pipe(browserSync.stream());
    };
};
