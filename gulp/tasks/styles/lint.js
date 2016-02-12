module.exports = function(gulp, config, plugins) {
    'use strict';

    return function() {
        return gulp.src(config.resources.styles)
            .pipe(plugins.scssLint(config.options.scsslint))
            .pipe(reload({stream:true}));
    };
};