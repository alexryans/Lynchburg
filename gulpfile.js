var gulp        = require('gulp'),
    _           = require('lodash'),
    jpegtran    = require('imagemin-jpegtran'),
    pngcrush    = require('imagemin-pngcrush'),
    pngquant    = require('imagemin-pngquant'),
    svgo        = require('imagemin-svgo'),
    path        = require('path'),
    webpack     = require('webpack'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    browserSync = require('browser-sync').create('browserSync'),
    reload      = browserSync.reload;

var production = !!plugins.util.env.production;

module.exports = function(projectConfig) {
    var filePaths = {
        src: {
            fonts: 'inc/fonts/**/*.*',
            images: 'inc/img/**/*.{png,jpg,jpeg,gif,svg,ico,json,xml}',
            scripts: 'inc/js/**/*.js',
            scriptsDir: 'inc/js',
            scriptsFilename: 'app.js',
            styles: 'inc/scss/**/*.scss',
            stylesDir: 'inc/scss',
            views: 'public/**/*.{html,phtml,php}'
        },
        dist: {
            base: 'public/inc/',
            fonts: 'fonts',
            images: 'img',
            scripts: 'js',
            scriptsFilename: 'app.js',
            styles: 'css'
        }
    };

    _.merge(filePaths, projectConfig);

    var webpackPlugins = {
        development: [
            new webpack.SourceMapDevToolPlugin()
        ],
        production: [
            new webpack.optimize.UglifyJsPlugin({
                comments: false
            })
        ]
    };

    var defaultConfig = {
        src: filePaths.src,
        dist: filePaths.dist,
        production: production,
        options: {
            autoprefixer: {
                browsers: [
                    'last 2 versions',
                    'ie >= 11'
                ]
            },
            browsersync: {
                open: false,
                notify: false,
                proxy: ''
            },
            csscomb: path.resolve(__dirname, '.csscomb.json'),
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
                responsiveType: false,
                shorthandPosition: false,
                quantityQueries: false,
                inputPseudo: false,
                clearFix: false,
                fontPath: false,
                hexRGBA: false,
                easings: false,
                fallbacks: false,
                autoprefixer: false,
                reporter: false
            },
            scss: {
                includePaths: [
                    'node_modules/foundation-sites/scss',
                    'node_modules/motion-ui/src/'
                ]
            },
            webpack: {
                context: path.resolve(filePaths.src.scriptsDir),
                entry: './' + filePaths.src.scriptsFilename,
                output: {
                    filename: filePaths.dist.scriptsFilename,
                    path: path.resolve(filePaths.dist.base, filePaths.dist.scripts),
                    publicPath: filePaths.src.scriptsDir + '/'
                },
                module: {
                    rules: [{
                        test: /\.js$/,
                        exclude: path.resolve(__dirname, '../what-input/dist/what-input.js'),
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['es2015']
                                }
                            }
                        ]
                    }],
                },
                plugins: production ? webpackPlugins.production : webpackPlugins.development
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
    gulp.task('images', getTask('images/build'));

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
        'images',
        'styles:comb',
        'styles',
        'scripts'
    ));

    gulp.task('watch', function() {
        gulp.watch(config.src.fonts, gulp.series('fonts'));
        gulp.watch(config.src.images, gulp.series('images'));
        gulp.watch(config.src.scripts, gulp.series('scripts', 'reload'));
        config.styleWatcher = gulp.watch(config.src.styles, gulp.series('styles:comb', 'styles'));
        gulp.watch(config.src.views, gulp.series('reload'));
    });

    gulp.task('default', gulp.parallel('build', 'serve', 'watch'));

    return gulp;
};