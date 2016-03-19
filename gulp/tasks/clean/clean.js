module.exports = function(gulp, config, plugins) {
    'use strict';

    var del = require('del');

    return function() {
        del([config.output.base]);
    };
};
