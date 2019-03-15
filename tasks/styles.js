const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').get('browserSync');
const Comb = require('csscomb');
const cssnano = require('cssnano');
const { src, dest } = require('gulp');
const Fiber = require('fibers');
const path = require('path');
const postcss = require('gulp-postcss');
const rucksack = require('rucksack-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('sass');

function stylesDev(config) {
    return () => src(config.paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                fiber: Fiber,
                ...config.options.scss
            }
        ).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(config.options.autoprefixer),
            rucksack(config.options.rucksack),
        ]))
        .pipe(sourcemaps.write())
        .pipe(dest(config.paths.styles.dist))
        .pipe(browserSync.stream());
}

function stylesProd(config) {
    return () => src(config.paths.styles.src)
        .pipe(
            sass({
                fiber: Fiber,
                ...config.options.scss
            }
        ).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(config.options.autoprefixer),
            rucksack(config.options.rucksack),
            cssnano(config.options.cssnano)
        ]))
        .pipe(dest(config.paths.styles.dist));
}

function cssComb(config) {
    // Get parent folder of src sass glob from config
    const scssFolder = path.dirname(config.paths.styles.src).substring(0, path.dirname(config.paths.styles.src).indexOf('**'));

    const comb = new Comb(require(config.options.csscomb));

    return cb => comb.processPath(scssFolder);
}

module.exports = config => ({
    dev: stylesDev(config),
    prod: stylesProd(config),
    csscomb: cssComb(config)
});
