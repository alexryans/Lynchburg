module.exports = function(gulp, config, plugins) {
    'use strict';

    var errorHandler = require('../../helpers/error-handler')(plugins);

    return function() {
        return gulp.src(config.resources.scripts)
            .pipe(plugins.plumber(config.options.plumber))
            .pipe(plugins.jshint(config.options.jshint))
                .on('error', errorHandler())
            .pipe(plugins.jshint.reporter(plugins.stylish));
    };
};