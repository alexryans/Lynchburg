module.exports = function(gulp, config, plugins) {
    'use strict';

    return function(task, callback) {
        return require('../tasks/' + task)(gulp, config, plugins, callback);
    };
};