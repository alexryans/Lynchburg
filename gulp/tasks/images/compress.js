module.exports = function(gulp, config, plugins) {
    'use strict';

    return function() {
        return gulp.src(config.src.images)
            .pipe(config.production ? plugins.imagemin(config.options.imagemin) : plugins.util.noop());
    };
};