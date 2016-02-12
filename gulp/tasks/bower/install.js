module.exports = function(gulp, config, plugins) {
    'use strict';

    var bower = require('bower');

    return function() {
        return bower.commands.install()
        .on('log', function(data) {
            plugins.util.log('bower', plugins.util.colors.cyan(data.id), data.message);
        });
    };
};