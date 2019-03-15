const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

function defaultWebpackConfig(config) {
    const webpackConfig = {
        entry: {},
        output: {
            path: path.resolve(config.dist.dir, config.dist.scripts),
            filename: '[name].js'
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

const errorHandler = cb => {
    return (err, stats) => {
        // console.log(stats.toString({
        //     colors: true
        // }));

        if(err) {
            console.error(err.stack || err);
            if(err.details) {
                console.error(err.details);
            }
            return;
        }

        const statsJson = stats.toJson();

        if(stats.hasErrors()) {
            statsJson.errors.forEach(error => console.error(error));
        }

        if(stats.hasWarnings()) {
            statsJson.warnings.forEach(warning => console.warn(warning));
        }

        cb();
    }
}

function scriptsDev(config) {
    const webpackConfig = {
        ...defaultWebpackConfig(config),
        mode: 'development',
        devtool: 'cheap-eval-source-map'
    };

    return cb => webpack(webpackConfig, errorHandler(cb));
}

function scriptsProd(config) {
    const webpackConfig = {
        ...defaultWebpackConfig(config),
        mode: 'production'
    };

    return cb => webpack(webpackConfig, errorHandler(cb));
}

module.exports = config => ({
    dev: scriptsDev(config),
    prod: scriptsProd(config)
});
