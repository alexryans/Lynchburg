module.exports = function(gulp, config, plugins, callback) {
    'use strict';

    var bower = require('bower');

    return function() {
        return bower.commands.install()
            .on('log', function(data) {
                plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
            })
            .on('end', function() {
                callback();
            })
            .on('error', function() {
                console.error('\x1b[33m%s:\x1b[0m %s', 'Warning', 'bower.json not found');
                callback();
            });
    }();
};