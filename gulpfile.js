// Define our dependencies
var gulp = require('gulp'),
    jpegtran = require('imagemin-jpegtran'),
    pngcrush = require('imagemin-pngcrush'),
    pngquant = require('imagemin-pngquant'),
    svgo = require('imagemin-svgo'),
    plugins = require('gulp-load-plugins')({ camelize: true })
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Config
var config = {
    resources: {
        fonts: './inc/fonts/**/*.*',
        images: './inc/img/**/*.{png,jpg,jpeg,gif,svg}',
        scripts: './inc/js/**/*.js',
        styles: './inc/scss/*.scss',
        views: './public/*.{html,php}'
    },
    output: {
        base: './public/inc',
        fonts: './public/inc/fonts',
        images: './public/inc/img',
        scripts: './public/inc/js',
        styles: './public/inc/css'
    },
    options: {
        browsersync: {
            ghostMode: false,
            open: false,
            proxy: 'gulp.app'
        },
        cmq: {},
        imagemin: {
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [
                jpegtran(),
                pngcrush(),
                pngquant(),
                svgo()
            ]
        },
        jshint: '',
        jshint_reporter: 'stylish',
        plumber: {errorHandler: errorHandler},
        rename: {suffix: '.min'},
        scss: {},
        scsslint: {
            config: '.scss-lint.yml',
            maxBuffer: 524288
        },
        uglify: {
            //mangle: true,
        }
    }
};

// Helpers
var errorHandler = require('./gulp/helpers/error-handler')(plugins),
    getTask = require('./gulp/helpers/get-task')(gulp, config, plugins);

/**
 * Check that GIT is installed.
 */
gulp.task('git:check', getTask('git/check'));

/**
 * Prune bower.
 */
gulp.task('bower:prune', getTask('bower/prune'));

/**
 * Install Bower components.
 */
gulp.task('bower:install', getTask('bower/install'));

/**
 * Clean (delete) the compiled assets directory. (/public/inc)
 */
gulp.task('clean', getTask('clean/clean'));

/**
 * Move fonts
 */
gulp.task('fonts', getTask('fonts/fonts'));

/**
 * Compress images using imagemin.
 */
gulp.task('images:compress', getTask('images/compress'));

/**
 * Move images
 */
gulp.task('images:move', getTask('images/move'));

/**
 * Compile scripts.
 */
gulp.task('scripts', getTask('scripts/build'));

/**
 * Error check scripts using jshint.
 */
gulp.task('scripts:lint', getTask('scripts/lint'));

/**
 * Compile styles.
 */
gulp.task('styles', getTask('styles/build'));

/**
 * Error check styles using scsslint.
 */
gulp.task('styles:lint', getTask('styles/lint'));

/*
  Browser Sync
*/
gulp.task('browser-sync', getTask('sync/sync'));

/**
 * Build sequence tasks.
 */
gulp.task('build:dev', getTask('build/dev'));
gulp.task('build:release', getTask('build/release'));

/**
 * Gulp tasks.
 */
gulp.task('watch', function() {
    gulp.watch(config.resources.fonts, ['fonts']);
    gulp.watch(config.resources.images, ['images:move']);
    gulp.watch(config.resources.scripts, ['scripts']);
    gulp.watch(config.resources.styles, ['styles', 'styles:lint']);
    gulp.watch(config.resources.views).on('change', reload);
});

gulp.task('default', function(callback) {
    runSequence('clean', 'build:dev', 'watch', callback);
});