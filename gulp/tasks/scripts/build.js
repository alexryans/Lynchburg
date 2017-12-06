module.exports = function(gulp, config, plugins) {
    'use strict';

    var webpack = require('webpack');

    return function(callback) {
        return webpack(config.options.webpack, function(err, stats) {
            let error = null;

            if(err) {
                error = err;
            }
            if(stats.compilation.errors.length) {
                error = stats.compilation.errors;
            }

            if(error) {
                if(config.production) {
                    throw Error(error);
                }
                else {
                    console.log(error);
                }
            }

            callback();
        });
    };
};
