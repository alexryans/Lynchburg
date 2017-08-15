module.exports = function(gulp, config, plugins) {
    'use strict';

    var webpack = require('webpack');

    return function(callback) {
        return webpack(config.options.webpack, function(err, stats) {
            if(err) {
                console.log(err);
            }
            if(stats.compilation.errors.length) {
                console.log(stats.compilation.errors);
            }
            callback();
        });
    };
};
