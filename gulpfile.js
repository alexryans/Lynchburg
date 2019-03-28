const browserSync = require('browser-sync').create('browserSync');
const _merge = require('lodash.merge');
const { series, parallel, watch } = require('gulp');
const path = require('path');
const yargs = require('yargs');

const generateDocumentation = require('./lib/documentation.js');
const timer = require('./lib/timer.js');

const defaultConfig = {
    src: {
        dir: 'src/',
        fonts: 'fonts/**/*.{woff,woff2,ttf,otf,svg}',
        images: 'img/**/*.{png,jpg,jpeg,gif,svg,ico,json,xml}',
        js: 'js/**/*.js',
        sass: 'scss/**/*.scss',
        views: ''
    },
    dist: {
        dir: 'dist/',
        fonts: 'fonts',
        images: 'img',
        js: 'js',
        css: 'css'
    },
    options: {
        autoprefixer: {},
        browsersync: {
            open: false,
            notify: false,
            proxy: ''
        },
        csscomb: path.resolve(__dirname, '.csscomb.json'),
        cssnano: {
            preset: 'default'
        },
        hash: {
            hashLength: 20,
            template: '<%= name %>.<%= hash %><%= ext %>'
        },
        rucksack: {
            responsiveType: true,
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
        sass: {
            includePaths: ['node_modules']
        },
        webpack: {
            // Generated by webpack task
        }
    }
};

function prettyLog(json) {
    console.log(JSON.stringify(json, null, 4));
}

function lynchburg(projectConfig) {
    const config = _merge({}, defaultConfig, projectConfig);

    // Set different flags based on command line arguments
    config.flags = {};
    config.flags.analyze = !!yargs.argv.analyze;
    config.flags.production = !!yargs.argv.production;

    // Build list of resolved paths to pass to tasks
    config.paths = {
        src: {},
        dist: {}
    };

    ['src', 'dist'].forEach(group => {
        Object.keys(config[group]).forEach(dirName => {
            if(dirName == 'dir' || dirName == 'views') {
                return;
            }
            config.paths[group][dirName] = path.resolve(config[group].dir, config[group][dirName])
        });
    });

    // prettyLog(config);

    const tasks = {};

    const clean = require('./tasks/clean.js');

    tasks.clean = clean(config.dist.dir);
    tasks.cleancss = clean(config.paths.dist.css);
    tasks.cleancss.displayName = 'cleancss';
    tasks.cleanjs = clean(config.paths.dist.js);
    tasks.cleanjs.displayName = 'cleanjs';

    tasks.csscomb = require('./tasks/csscomb.js')(config);
    tasks.fonts = require('./tasks/fonts.js')(config);
    tasks.images = require('./tasks/images.js')(config);
    tasks.reload = require('./tasks/reload.js')();
    tasks.sass = series(
        tasks.cleancss,
        require('./tasks/sass.js')(config)
    );
    tasks.webpack = series(
        tasks.cleanjs,
        require('./tasks/webpack.js')(config)
    );

    // Watchers are passed timed tasks to show output when watched task fires
    tasks.watch = cb => {
        watch(config.paths.src.fonts, tasks.fonts);

        watch(config.paths.src.images, tasks.images);

        watch(config.paths.src.js, series(
            tasks.cleanjs,
            tasks.webpack,
            tasks.reload
        ));

        // Sass watcher is paused during CSScomb and Sass to avoid infinite loop
        const sassWatcher = watch(config.paths.src.sass, series(
            cb => {
                sassWatcher.unwatch(config.paths.src.sass);
                cb();
            },
            tasks.csscomb,
            tasks.sass,
            cb => {
                sassWatcher.add(config.paths.src.sass);
                cb();
            }
        ));

        watch(config.src.views, tasks.reload);
    }

    tasks.serve = cb => {
        browserSync.init(config.options.browsersync);
    }

    // Gulp doesn't show output for tasks in series/parallel when exported via Lynchburg, so force output with timer
    tasks.build = series(
        tasks.clean,
        parallel(
            tasks.fonts,
            tasks.images,
            series(
                tasks.csscomb,
                tasks.sass
            ),
            tasks.webpack
        )
    );

    tasks.default = series(tasks.build, parallel(tasks.serve, tasks.watch));

    // Generate documentation for each task for `gulp --tasks`
    Object.keys(tasks).forEach(taskName => {
        generateDocumentation(tasks[taskName], taskName);
    });

    return tasks;
};

module.exports = lynchburg;
