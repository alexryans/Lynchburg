module.exports = function(gulp, config, plugins) {
    'use strict';

    return function() {
        if(config.styleWatcher) {
            config.styleWatcher.unwatch(config.src.styles);
        }

        return gulp.src(config.src.styles)
            .pipe(plugins.csscomb(config.options.csscomb))
            .pipe(gulp.dest('./inc/scss/'))
            .on('end', function() {
                if(config.styleWatcher) {
                    config.styleWatcher.add(config.src.styles);
                }
            });
    };
};