module.exports = function(gulp, config, plugins) {
    'use strict';

    var webpack = require('webpack');

    return function(callback) {
        return webpack(config.options.webpack, function(err, stats) {
            callback();
        });
    };
};
