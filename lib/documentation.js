function generateDocumentation(task, taskName) {
    switch(taskName) {
        case 'build':
            task.description = 'Runs a complete build, using all build tasks.';
            task.flags = {
                '--production': 'Runs each task in production mode.'
            }
            break;

        case 'clean':
            task.description = 'Empties dist folder.';
            break;

        case 'cleancss':
            task.description = 'Empties dist CSS folder. Run automatically before the sass task.';
            break;

        case 'cleanjs':
            task.description = 'Empties dist JS folder. Run automatically before the webpack task.';
            break;

        case 'csscomb':
            task.description = 'Formats Sass files in config.src.sass and sorts properties in a specific order.';
            break;

        case 'default':
            task.description = 'Runs a non-production build and starts the serve and watch tasks.';
            task.flags = {
                '--production': 'Runs each task in production mode.'
            }
            break;

        case 'fonts':
            task.description = 'Simply moves fonts from src to dist.'
            break;

        case 'images':
            task.description = 'Moves images from src to dist.'
            task.flags = {
                '--production': 'Minifies each image.'
            }
            break;

        case 'reload':
            task.description = 'Reloads the running Browsersync instance. Used internally by other tasks.';
            break;

        case 'sass':
            task.description = 'Compiles Sass files to CSS using Dart Sass. Also adds vendor prefixes using Autoprefixer and responsive typography from Rucksack.';
            task.flags = {
                '--production': 'Removes source maps and minifies CSS.'
            }
            break;

        case 'serve':
            task.description = 'Runs Browsersync as a proxy of the site specified in config.options.browsersync.proxy.';
            break;

        case 'watch':
            task.description = 'Watches source files and runs the appropriate Gulp task when a change occurs.';
            break;

        case 'webpack':
            task.description = 'Uses Webpack to produce a bundle for each JS file in config.src.js.'
            task.flags = {
                '--production': 'Runs Webpack in production mode, which removes source maps and minifies output among other things.',
                '--analyze': 'Runs Webpack Bundle Analyzer to visualise Webpack bundles in an interactive treemap.'
            }
            break;
    }
}

module.exports = generateDocumentation;
