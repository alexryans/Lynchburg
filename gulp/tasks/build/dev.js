module.exports = function(gulp, config, plugins) {
    'use strict';

    var runSequence = require('run-sequence');

    return function(callback) {
        console.info('\nDevelopment build\n');

        runSequence(
            'bower:prune',
            'bower:install',
            'fonts',
            'images:move',
            'scripts',
            'styles',
            'styles:lint',
            'browser-sync', callback);
    };
};