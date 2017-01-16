# Lynchburg

![Lynchburg logo](/lynchburg-hero.jpg)

> "It’s not a framework, it’s a starting point."

## Install
```sh
$ npm install lynchburg --save-dev
```

### Prerequisites
- Node/npm
  - If you're running macOS, the easiest way to download Node is to first install [Homebrew](http://brew.sh), then run `brew install node`.
  - On Linux, the easiest way is to use [nvm](https://github.com/creationix/nvm).
- Gulp CLI
  - `npm install gulpjs/gulp-cli -g`

## Basic Usage
Create a `gulpfile.js` like so:
```js
var config = {
    src: {
        views: './web/**/*.{html,phtml,php}'
    },
    dist: {
        base: './web/app/themes/metallisation/inc'
    },
    options: {
        browsersync: {
            proxy: 'metallisation.app'
        }
    }
};

require('lynchburg')(config);
```

You can now use any of Lynchburg's gulp tasks! Run `gulp` to trigger a build, start Browsersync, and start watching files. Pass the `--production` flag to run in production mode, for example to build production files:
```sh
$ gulp build --production
```

## Configuration
Lynchburg can be configured by passing it a config object that overrides any of the keys in the default config object:
```js
{
    src: {
        fonts: 'inc/fonts/**/*.*',
        images: 'inc/img/**/*.{png,jpg,jpeg,gif,svg,ico,json,xml}',
        scripts: 'inc/js/**/*.js',
        scriptsDir: 'inc/js',
        scriptsFilename: 'app.js',
        styles: 'inc/scss/**/*.scss',
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
        },
        webpack: {
            context: 'inc/js',
            entry: './app.js',
            output: {
                filename: 'app.js',
                path: path.resolve('public/inc/js'),
                publicPath: 'inc/js/'
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
            plugins: production
                ? [ new webpack.SourceMapDevToolPlugin() ]
                : [ new webpack.optimize.UglifyJsPlugin({ comments: false }) ]
            };
        }
    }
}
```

## Features
Lynchburg has gulp tasks to take care of the following tasks:

### Bower
- Checks and prunes installed Bower components and flushes out any which are no longer in use.
- Installs any new Bower dependencies added to the `bower.json` file since the `gulp` task was last run.

### Compilation
- Uses [BrowserSync](https://www.browsersync.io) to create a local server.
- Compiles and minifies Sass to CSS and moves the compiled file to `./public/inc/css`.
- Uses [CSScomb](http://csscomb.com/) to order properties in .scss files according to the .csscomb.json file.
- Uses [Webpack 2](https://webpack.js.org/) to bundle JS files into one `app.js` files.
- Moves images to `./public/inc/img`.
- Removes sourcemaps, minifies CSS/JS, and compresses images when given the `--production` flag.
- Moves fonts to `./public/inc/fonts`.

The build sequence also watches the source files for Sass, JS, font, and image files, rerunning the appropriate tasks whenever a change is made to one of the watched files/folders.