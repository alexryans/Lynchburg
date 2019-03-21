const glob = require('glob');
const globParent = require('glob-parent');
const notifier = require('node-notifier');
const path = require('path');
const webpack = require('webpack');

const timer = require('../lib/timer.js');

function defaultWebpackConfig(config) {
    const webpackConfig = {
        entry: {},
        output: {
            path: config.paths.dist.js,
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    }

    // Make separate entry point for each file in top level src js folder
    const entryFiles = path.join(config.src.dir, globParent(config.src.js), '/*.js');

    glob.sync(entryFiles).forEach(filename => {
        webpackConfig.entry[path.parse(filename).name] = `./${filename}`;
    });

    return webpackConfig;
}

const errorHandler = (err, stats) => {
    // console.log(stats.toString({ colors: true }));

    if(err) {
        console.error(err.stack || err);
        if(err.details) {
            console.error(err.details);
        }
        return;
    }

    const statsJson = stats.toJson();

    if(stats.hasErrors()) {
        statsJson.errors.forEach(error => {
            console.error(error);

            notifier.notify({
                title: 'Error running Gulp',
                message: error,
                sound: 'Frog',
                icon: path.join(__dirname, '../node_modules/gulp-notify/assets/gulp-error.png'),
            });
        });
    }

    if(stats.hasWarnings()) {
        statsJson.warnings.forEach(warning => console.error(warning));
    }
}

function webpackDev(config) {
    const webpackConfig = {
        ...defaultWebpackConfig(config),
        mode: 'development',
        devtool: 'cheap-eval-source-map'
    };

    return cb => {
        const start = timer.start('webpack');

        return webpack(webpackConfig, (err, stats) => {
            errorHandler(err, stats);
            timer.finish('webpack', start);

            cb();
        });
    }
}

function webpackProd(config) {
    const webpackConfig = {
        ...defaultWebpackConfig(config),
        mode: 'production'
    };

    return cb => webpack(webpackConfig, (err, stats) => {
        errorHandler(err, stats);

        cb();
    });
}

module.exports = config => ({
    dev: webpackDev(config),
    prod: webpackProd(config)
});
