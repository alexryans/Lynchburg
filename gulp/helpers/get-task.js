module.exports = function(gulp, config, plugins) {
    'use strict';

    return function(task) {
        return require('../tasks/' + task)(gulp, config, plugins);
    }
};