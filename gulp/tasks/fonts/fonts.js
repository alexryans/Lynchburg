module.exports = function(gulp, config, plugins) {
    'use strict';

    return function() {
        return gulp.src(config.resources.fonts)
            .pipe(gulp.dest(config.output.fonts));
    };
};