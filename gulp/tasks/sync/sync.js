module.exports = function(gulp, config, plugins) {
    'use strict';

    return function() {
        browserSync(config.options.browsersync);
    };
};