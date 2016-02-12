module.exports = function(gulp, config, plugins) {
    'use strict';

    var runSequence = require('run-sequence');

    return function(callback) {
        console.info('\nMajor build\n');

        runSequence(
            'git:check',
            'bower:prune',
            'bower:install',
            'clean',
            'fonts',
            'images:compress',
            'images:move',
            'scripts',
            'scripts:lint',
            'styles',
            'styles:lint', callback);
    };
};