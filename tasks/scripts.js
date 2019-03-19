const glob = require('glob');
const notifier = require('node-notifier');
const path = require('path');
const webpack = require('webpack');

const timer = require('../lib/timer.js');

function defaultWebpackConfig(config) {
    const webpackConfig = {
        entry: {},
        output: {
            path: path.resolve(config.dist.dir, config.dist.scripts),
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

    // Make separate entry point for each file in top level src.scripts folder
    const entryFolder = path.dirname(config.src.scripts).substring(0, path.dirname(config.src.scripts).indexOf('**'));
    const entryFiles = path.join(config.src.dir, entryFolder, '/*.js');

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

function scriptsDev(config) {
    const webpackConfig = {
        ...defaultWebpackConfig(config),
        mode: 'development',
        devtool: 'cheap-eval-source-map'
    };

    return cb => {
        const start = timer.start('scripts');

        return webpack(webpackConfig, (err, stats) => {
            errorHandler(err, stats);
            timer.finish('scripts', start);

            cb();
        });
    }
}

function scriptsProd(config) {
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
    dev: scriptsDev(config),
    prod: scriptsProd(config)
});
