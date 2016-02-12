module.exports = function(gulp, config, plugins) {
    'use strict';

    var del = require('del');

    return function(callback) {
        del([config.output.base], callback);
    };
};