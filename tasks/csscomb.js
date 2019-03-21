const Comb = require('csscomb');
const globParent = require('glob-parent');

const timer = require('../lib/timer.js');

function cssComb(config) {
    // Disable CSScomb when option is false
    if(!config.options.csscomb) {
        return cb => {
            console.log('CSScomb has been disabled in the options.');
            cb();
        }
    }

    const comb = new Comb(require(config.options.csscomb));

    return () => {
        const start = timer.start('csscomb');

        return comb.processPath(globParent(config.paths.src.sass)).then(() => {
            timer.finish('csscomb', start);
        });
    }
}

module.exports = config => cssComb(config);
