const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').get('browserSync');
const cssnano = require('cssnano');
const Fiber = require('fibers');
const { src, dest } = require('gulp');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rucksack = require('rucksack-css');

const timer = require('../lib/timer.js');

sass.compiler = require('sass');

function sassDev(config) {
    return () => {
        const start = timer.start('sass');

        return src(config.paths.src.sass)
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    fiber: Fiber,
                    ...config.options.sass
                })
                .on('error', notify.onError(error => error.message))
            )
            .pipe(postcss([
                autoprefixer(config.options.autoprefixer),
                rucksack(config.options.rucksack),
            ]))
            .pipe(sourcemaps.write())
            .pipe(dest(config.paths.dist.css))
            .pipe(browserSync.stream())
            .on('end', () => {
                timer.finish('sass', start);
            });
    }
}

function sassProd(config) {
    return () => src(config.paths.src.sass)
        .pipe(
            sass({
                fiber: Fiber,
                ...config.options.sass
            })
            .on('error', notify.onError(error => error.message))
        )
        .pipe(postcss([
            autoprefixer(config.options.autoprefixer),
            rucksack(config.options.rucksack),
            cssnano(config.options.cssnano)
        ]))
        .pipe(dest(config.paths.dist.css));
}

module.exports = config => config.isProduction ? sassProd(config) : sassDev(config);
