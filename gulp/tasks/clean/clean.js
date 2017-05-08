module.exports = function(gulp, config, plugins, callback) {
    'use strict';

    var del = require('del');

    return function() {
        del([config.dist.base+'/**', '!'+config.dist.base, '!'+config.dist.base+'/.gitkeep']).then(callback());
    }();
};
