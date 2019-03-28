const browserSync = require('browser-sync').get('browserSync');

function reload(cb) {
    browserSync.reload();
    cb();
}

module.exports = () => {
    const reloadTask = cb => reload(cb);
    reloadTask.displayName = 'reload';
    return reloadTask;
}
