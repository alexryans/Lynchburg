module.exports = function(gulp, config, plugins) {
    'use strict';

    var path = require('path');

    return function() {
        return gulp.src(config.src.images)
            .pipe(config.production ? plugins.imagemin(config.options.imagemin) : plugins.util.noop())
            .pipe(gulp.dest(path.resolve(config.dist.base, config.dist.images)));
    };
};