module.exports = function(gulp, config, plugins) {
    'use strict';

    return function() {
        return gulp.src(config.resources.images)
            .pipe(plugins.plumber(config.options.plumber))
            .pipe(plugins.imagemin(config.options.imagemin))
            .pipe(plugins.plumber.stop());
    };
};