const { src, dest } = require('gulp');
const sass = require('gulp-sass');

function build(config) {
    return () => src(config.paths.styles.src)
        .pipe(sass())
        .pipe(dest(config.paths.styles.dist));
}

module.exports = config => ({
    build: build(config)
});
