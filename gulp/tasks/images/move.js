module.exports = function(gulp, config, plugins) {
    'use strict';

    var path = require('path');

    return function() {
        return gulp.src(config.src.images)
            .pipe(gulp.dest(path.resolve(config.dist.base, config.dist.images)));
    };
};