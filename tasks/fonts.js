const { src, dest } = require('gulp');

function fonts(config) {
    return () => src(config.paths.src.fonts)
        .pipe(dest(config.paths.dist.fonts));
}

module.exports = config => fonts(config);
