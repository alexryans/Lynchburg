const globParent = require('glob-parent');
const { src, dest } = require('gulp');
const csscomb = require('gulp-csscomb');

function cssComb(config) {
    // Disable CSScomb when option is false
    if(!config.options.csscomb) {
        return cb => {
            console.log('CSScomb has been disabled in the options.');
            cb();
        }
    }

    return () => src(config.paths.src.sass)
        .pipe(csscomb(config.options.csscomb))
        .pipe(dest(globParent(config.paths.src.sass)));
}

module.exports = config => cssComb(config);
