const del = require('del');

function clean(path) {
    return () => del([
        `${path}/**`,
        `!${path}`, // Don't remove given folder itself
        `!${path}/.gitkeep`
    ]);
}

module.exports = path => clean(path);
