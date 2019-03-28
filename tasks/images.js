const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');

function imagesDev(config) {
    return () => src(config.paths.src.images)
        .pipe(dest(config.paths.dist.images));
}

function imagesProd(config) {
    return () => src(config.paths.src.images)
        .pipe(imagemin())
        .pipe(dest(config.paths.dist.images));
}

module.exports = config => {
    const imagesTask = config.flags.production ? imagesProd(config) : imagesDev(config);
    imagesTask.displayName = 'images';
    return imagesTask;
}
