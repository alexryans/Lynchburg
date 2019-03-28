const del = require('del');

function clean(path) {
    return () => del([
        `${path}/**`,
        `!${path}`, // Don't remove given folder itself
        `!${path}/.gitkeep`
    ]);
}

module.exports = path => {
    const cleanTask = clean(path);
    cleanTask.displayName = 'clean';
    return cleanTask;
}
