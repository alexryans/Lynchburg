# Lynchburg

![Lynchburg logo](/lynchburg-hero.jpg)

> "It’s not a framework, it’s a starting point."

Lynchburg is a collection of [Gulp](https://github.com/gulpjs/gulp) tasks for common frontend development tasks.
- Compiles and minifies Sass to CSS and includes [Autoprefixer](https://github.com/postcss/autoprefixer) and the responsive typography from [Rucksack](https://github.com/seaneking/rucksack)
- Formats source sass files using [CSScomb](http://csscomb.com/) according to the `.csscomb.json` configuration file.
- Bundles JS files using [Webpack](https://webpack.js.org/).
- Minifies images.
- Production builds, which removes sourcemaps, minifies output CSS/JS, and compresses images.
- Watches source files and runs the appropriate tasks when changes are detected.
- Uses [Browsersync](https://www.browsersync.io) to proxy a local server and update browsers when files are updated.

## Install
```sh
$ npm install lynchburg
```
or
```sh
$ yarn add lynchburg
```

### Prerequisites
- Node/npm
  - If you're running macOS, the easiest way to download Node is to first install [Homebrew](http://brew.sh), then run `brew install node`.
  - On Linux, the easiest way is to use [nvm](https://github.com/creationix/nvm).
- Gulp CLI
  - `npm install -g gulp-cli` or `yarn global add gulp-cli`

## Basic Usage
Create a `gulpfile.js` with the options you want to override from the default config. If you're using Bedrock for a WordPress site, your config will probably want to look like this:
```js
const config = {
    src: {
        views: 'web/app/themes/SITE_NAME/**/*.{html,phtml,php,twig}'
    },
    dist: {
        dir: 'web/app/themes/SITE_NAME/dist'
    },
    options: {
        browsersync: {
            proxy: 'SITE_NAME.local'
        }
    }
};

module.exports = require('lynchburg')(config);
```

You can now use any of Lynchburg's gulp tasks! Run `gulp` to run the default task and trigger a build, start Browsersync, and start watching files. Pass the `--production` flag to run in production mode. For example, to do a production build:
```sh
$ gulp build --production
```

You can see all the available tasks and a description of what each one does by running the following command:
```sh
$ gulp --tasks
```

## Configuration
Lynchburg can be configured by passing it a config object that overrides any of the keys in the default config object. The passed config will be merged in with the default config, so you needn't redefine any keys you don't need to change.

### CSScomb
CSScomb can be disabled by setting `config.options.csscomb` to false.
