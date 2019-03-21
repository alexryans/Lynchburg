const del = require('del');

function clean(config) {
    return () => del([
        `${config.dist.dir}/**`,
        `!${config.dist.dir}`, // Don't remove dist folder itself
        `!${config.dist.dir}/.gitkeep`
    ]);
}

module.exports = config => clean(config);
