module.exports = function(gulp, config, plugins) {
    'use strict';

    var sh = require('shelljs');

    return function(callback) {
        if (!sh.which('git')) {
            console.log(
                '  ' + plugins.util.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required.',
                '\n  Download git here:', plugins.util.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + plugins.util.colors.cyan('gulp install') + '\' again.'
            );
            process.exit(1);
        }

        callback();
    };
};