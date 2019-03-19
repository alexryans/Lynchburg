const c = require('ansi-colors');
const log = require('gulplog');
const prettyHrtime = require('pretty-hrtime');

function start(taskName) {
    log.info(`Starting '${c.cyan(taskName)}'...`);

    return process.hrtime();
}

function finish(taskName, startTime) {
    const endTime = process.hrtime(startTime);

    log.info(`Finished '${c.cyan(taskName)}' after ${c.magenta(prettyHrtime(endTime))}`);
}

module.exports = {
    start: start,
    finish: finish
};
