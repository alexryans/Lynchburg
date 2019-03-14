const { src, dest } = require('gulp');

function fonts(config) {
    return () => src(config.paths.fonts.src)
        .pipe(dest(config.paths.fonts.dist));
}

module.exports = config => ({
    fonts: fonts(config)
});
