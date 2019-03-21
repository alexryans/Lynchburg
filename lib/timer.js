const c = require('ansi-colors');
const { series } = require('gulp');
const log = require('gulplog');
const prettyHrtime = require('pretty-hrtime');

function startTimer(taskName) {
    log.info(`Starting '${c.cyan(taskName)}'...`);

    return process.hrtime();
}

function endTimer(taskName, startTime) {
    const endTime = process.hrtime(startTime);

    log.info(`Finished '${c.cyan(taskName)}' after ${c.magenta(prettyHrtime(endTime))}`);
}

// Mimics Gulp logging and timing of a task
function timer(task) {
    let startTime = null;

    return series(
        cb => {
            startTime = startTimer(task.displayName);
            cb();
        },
        task,
        cb => {
            endTimer(task.displayName, startTime);
            cb();
        }
    );
}

module.exports = timer;
