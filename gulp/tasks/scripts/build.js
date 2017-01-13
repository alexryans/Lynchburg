module.exports = function(gulp, config, plugins) {
    'use strict';

    var path    = require('path'),
        webpack = require('webpack');

    var developmentPlugins = [
        new webpack.SourceMapDevToolPlugin()
    ];

    var productionPlugins = [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        })
    ];

    return function(callback) {
        return webpack({
            context: path.resolve(config.src.scriptsDir),
            entry: ['./' + config.src.scriptsFilename],
            output: {
                filename: config.dist.scriptsFilename,
                path: path.resolve(config.dist.base, config.dist.scripts),
                publicPath: '/inc/js/',
            },
            module: {
                rules: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
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
            externals: {
                foundation: 'Foundation'
            },
            plugins: config.production ? productionPlugins : developmentPlugins
        }, function(err, stats) {
            callback();
        });
    };
};
