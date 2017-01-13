var gulp        = require('gulp'),
    _           = require('lodash'),
    jpegtran    = require('imagemin-jpegtran'),
    pngcrush    = require('imagemin-pngcrush'),
    pngquant    = require('imagemin-pngquant'),
    svgo        = require('imagemin-svgo'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    browserSync = require('browser-sync').create('browserSync'),
    reload      = browserSync.reload;

module.exports = function(projectConfig) {
    var defaultConfig = {
        src: {
            fonts: './inc/fonts/**/*.*',
            images: './inc/img/**/*.{png,jpg,jpeg,gif,svg,ico,json,xml}',
            scripts: './inc/js/**/*.js',
            scriptsDir: './inc/js',
            scriptsFilename: 'app.js',
            styles: './inc/scss/**/*.scss',
            views: './public/**/*.{html,phtml,php}'
        },
        dist: {
            base: './public/inc/',
            fonts: 'fonts',
            images: 'img',
            scripts: 'js',
            scriptsFilename: 'app.js',
            styles: 'css'
        },
        production: !!plugins.util.env.production,
        options: {
            autoprefixer: {
                browsers: [
                    'last 2 versions',
                    'ie >= 9'
                ]
            },
            browsersync: {
                open: false,
                notify: false,
                proxy: ''
            },
            imagemin: {
                optimizationLevel: 3,
                progressive: true,
                interlaced: true,
                svgoPlugins: [{ removeViewBox: false }],
                use: [
                    jpegtran(),
                    pngcrush(),
                    pngquant(),
                    svgo()
                ]
            },
            rucksack: {
                shorthandPosition: false,
                quantityQueries: false,
                alias: false,
                inputPseudo: false,
                clearFix: false,
                fontPath: false,
                easings: false
            },
            scss: {
                includePaths: [
                    'node_modules/foundation-sites/scss',
                    'node_modules/motion-ui/src/'
                ]
            }
        }
    };

    var config = _.merge({}, defaultConfig, projectConfig);

    // Helpers
    var errorHandler = require('./gulp/helpers/error-handler')(plugins),
        getTask      = require('./gulp/helpers/get-task')(gulp, config, plugins);

    // Prune bower and install bower components
    gulp.task('bower:prune', function(callback) {
        getTask('bower/prune', callback);
    });
    gulp.task('bower:install', function(callback) {
        getTask('bower/install', callback);
    });

    // Clean the compiled assets directory
    gulp.task('clean', function(callback) {
        getTask('clean/clean', callback);
    });

    // Move fonts
    gulp.task('fonts', getTask('fonts/fonts'));

    // Compress images using imagemin
    gulp.task('images:compress', getTask('images/compress'));
    gulp.task('images:move', getTask('images/move'));

    // Compile scripts
    gulp.task('scripts', getTask('scripts/build'));

     // Compile styles
    gulp.task('styles', getTask('styles/build'));

    // Pause styles watcher and order scss files using CSScomb
    gulp.task('styles:comb', getTask('styles/comb'));

    // Browsersync
    gulp.task('serve', function() {
        browserSync.init(config.options.browsersync);
    });
    gulp.task('reload', function(callback) {
        browserSync.reload();
        callback();
    });

    gulp.task('build', gulp.series(
        'clean',
        'bower:prune',
        'bower:install',
        'fonts',
        'images:move',
        'images:compress',
        'scripts',
        'styles:comb',
        'styles'
    ));

    gulp.task('watch', function() {
        gulp.watch(config.src.fonts, gulp.series('fonts'));
        gulp.watch(config.src.images, gulp.series('images:move'));
        gulp.watch(config.src.scripts, gulp.series('scripts', 'reload'));
        config.styleWatcher = gulp.watch(config.src.styles, gulp.series('styles:comb', 'styles'));
        gulp.watch(config.src.views, gulp.series('reload'));
    });

    gulp.task('default', gulp.parallel('build', 'serve', 'watch'));

    return gulp;
};