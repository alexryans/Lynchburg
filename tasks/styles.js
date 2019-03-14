const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const rucksack = require('rucksack-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

function stylesDev(config) {
    return () => src(config.paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(config.options.autoprefixer),
            rucksack(config.options.rucksack),
        ]))
        .pipe(sourcemaps.write())
        .pipe(dest(config.paths.styles.dist));
}

function stylesProd(config) {
    return () => src(config.paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(config.options.autoprefixer),
            rucksack(config.options.rucksack),
            cssnano(config.options.cssnano)
        ]))
        .pipe(dest(config.paths.styles.dist));
}

module.exports = config => ({
    dev: stylesDev(config),
    prod: stylesProd(config)
});
