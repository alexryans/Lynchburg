module.exports = function(gulp, config, plugins) {
    'use strict';

     var errorHandler = require('../../helpers/error-handler')(plugins);

    return function() {
        return gulp.src(config.resources.scripts)
            .pipe(plugins.plumber(config.options.plumber))
            //.pipe(plugins.expectFile(config.resources.scripts))
            //.pipe(gulp.dest('public/js'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('app.min.js'))
            .pipe(plugins.uglify())
                .on('error', errorHandler())
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.plumber.stop())
            .pipe(gulp.dest(config.output.scripts))
            .pipe(reload({stream:true}));
    };
};