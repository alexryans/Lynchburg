const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');

function imagesDev(config) {
    return () => src(config.paths.images.src)
        .pipe(dest(config.paths.images.dist));
}

function imagesProd(config) {
    return () => src(config.paths.images.src)
        .pipe(imagemin())
        .pipe(dest(config.paths.images.dist));
}

module.exports = config => ({
    dev: imagesDev(config),
    prod: imagesProd(config)
});
