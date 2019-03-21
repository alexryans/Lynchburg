const globParent = require('glob-parent');
const { src, dest } = require('gulp');
const csscomb = require('gulp-csscomb');

const timer = require('../lib/timer.js');

function cssComb(config) {
    // Disable CSScomb when option is false
    if(!config.options.csscomb) {
        return cb => {
            console.log('CSScomb has been disabled in the options.');
            cb();
        }
    }

    return () => {
        const start = timer.start('csscomb');

        return src(config.paths.src.sass)
            .pipe(csscomb(config.options.csscomb))
            .pipe(dest(globParent(config.paths.src.sass)))
            .on('end', () => {
                timer.finish('csscomb', start);
            });
    }
}

module.exports = config => cssComb(config);
