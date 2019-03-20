const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').get('browserSync');
const Comb = require('csscomb');
const cssnano = require('cssnano');
const Fiber = require('fibers');
const globParent = require('glob-parent');
const { src, dest } = require('gulp');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const rucksack = require('rucksack-css');

const timer = require('../lib/timer.js');

sass.compiler = require('sass');

function stylesDev(config) {
    return () => {
        const start = timer.start('styles');

        return src(config.paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    fiber: Fiber,
                    ...config.options.scss
                })
                .on('error', notify.onError(error => error.message))
            )
            .pipe(postcss([
                autoprefixer(config.options.autoprefixer),
                rucksack(config.options.rucksack),
            ]))
            .pipe(sourcemaps.write())
            .pipe(dest(config.paths.styles.dist))
            .pipe(browserSync.stream())
            .on('end', () => {
                timer.finish('styles', start);
            });
    }
}

function stylesProd(config) {
    return () => src(config.paths.styles.src)
        .pipe(
            sass({
                fiber: Fiber,
                ...config.options.scss
            })
            .on('error', notify.onError(error => error.message))
        )
        .pipe(postcss([
            autoprefixer(config.options.autoprefixer),
            rucksack(config.options.rucksack),
            cssnano(config.options.cssnano)
        ]))
        .pipe(dest(config.paths.styles.dist));
}

function cssComb(config) {
    // Disable CSScomb when option is false
    if(!config.options.csscomb) {
        return cb => {
            console.log('CSScomb has been disabled in the options.');
            cb();
        }
    }

    const comb = new Comb(require(config.options.csscomb));

    return () => {
        const start = timer.start('csscomb');

        return comb.processPath(globParent(config.paths.styles.src)).then(() => {
            timer.finish('csscomb', start);
        });
    }
}

module.exports = config => ({
    dev: stylesDev(config),
    prod: stylesProd(config),
    csscomb: cssComb(config)
});
