# Lynchburg

![Lynchburg logo](/lynchburg-hero.jpg)

> "It’s not a framework, it’s a starting point."

## Installation
- Clone Lynchburg into your project directory.
- Run `sh setup.sh`.
  - Clone [Bitters](https://github.com/thoughtbot/bitters).
  - Copy the Bitters stylesheets into `inc/scss/framework/`
  - Delete Bitters `_base.scss` and `_grid-settings.scss` files.
  - Copy Lynchburg's `_grid-settings.scss` into `inc/scss/framework/`
  - Delete the Bitters clone.
  - Delete Lynchburg's `overrides` folder.
  - Clone [Normalize](https://github.com/necolas/normalize.css)
  - Copy and rename `normalize.css` to `inc/scss/framework/_normalize.scss`
  - Delete normalize clone.
  - Delete `.git` folder.
  - Delete `inc/scss/framework/.gitignore`
  - Delete the `setup.sh` file.
- `npm install`.
  - This will install all the project dependencies from npm.
- Run `gulp`.

### Warning
__Warning__: Do not run on your Lynchburg clone as it will delete all your version control! This is designed to be run within your working website projects.

### Prerequisites
- Node/npm
  - If you're running OS X, the easiest way to download Node is via [Homebrew](http://brew.sh).
  - `brew install node`
- Gulp
  - `npm install gulp`
- Ruby/scss-lint gem

#### Ruby/scss-lint
You have to make sure you have Ruby and scss-lint installed in order for the `styles:lint` Gulp task to run successfully:
- `brew install ruby`
- `gem install scss_lint`

Finally, you'll need to make sure you have the `.scss-lint.yml` config file in your project. The file itself begins with a `.`, so it'll be hidden in your file structure unless you can see hidden files in your file explorer window.

## Configuration
### I/O
You can define your source and compilation locations in `gulpfile.js`, in the main config block - just look for the `resources` and `output` arrays.

## Breakpoints in Lynchburg
There are two types of breakpoints:

### Infinite Breakpoints
Apply from 0 and up and overwrite the previous.

```
@include media($m-up) {
    padding: 10px;
}
```

compiles to… (note min-width only media queries)

```
@media screen and (min-width: 20.0625em) {
  padding: 10px;
}
```

### Specific Breakpoints
Apply between two specific points.

```
@include media($s-m) {
    margin: 20px;
}
```

compiles to… (note between min-width and max-width media queries)

```
@media screen and (min-width: 20.0625em) and (max-width: 48.0625em) {
  margin: 20px;
}
```

### Grid Example
This grid example shows the use of _Specific_ and _Infinite_ breakpoints. Between size `0` to `$s` (`$z-s`) there are 2 columns (each using 6 of total 12 grid columns). At size `$s` to `$m` it breaks into 4 columns (each using 3 of 12), and finally from `$m` upwards it splits to 6 columns (each using 2 of 12).

```
.grid-example {
    @include media($z-s) {
        @include span-columns(6);
        @include omega(2n);
    }

    @include media($s-m) {
        @include span-columns(3);
        @include omega(4n);
    }

    @include media($m-up) {
        @include span-columns(2);
        @include omega(6n);
    }
}
```

## Gulp
This system is essentially an automated build tool which takes care of the following tasks:

### Bower
- Checks and prunes installed Bower components and flushes out any which are no longer in use.
- Installs any new Bower dependencies added to the `bower.json` file since the `gulp` task was last run.

### Compilation
- Compiles and minifies Sass to CSS and moves the compiled file to `./public/inc/css`.
- Lints Sass for formatting.
- Lints JS for formatting (in the release build process only).
- Concatonates and minifies JS files into one `app.min.js` file.
- Moves images to `./public/inc/img`, compresses images (in the release build process only).
- Moves fonts to `./public/inc/fonts`.
- Uses [BrowserSync](https://www.browsersync.io) to create a local server.

The build sequence also 'watches' the source files for Sass, JS, font and image files, rerunning the appropriate tasks whenever a change is made to one of the watched files/folders.

## Helpful resources
- [scss-lint documentation](https://github.com/brigade/scss-lint)
- [scss-lint config documentation](https://github.com/brigade/scss-lint/tree/master/lib/scss_lint/linter)

## Notes
- For now, we're pulling down Bitters v1.2.0, as the latest version (v1.3.0) includes some updates specifically for Bourbon v5, which is still a pre-release.
- If you are dorky enough to run `setup.sh` on your Lynchburg maintenance project you'll lose everything that has not been pushed to github. You'll have to do a new `git clone` and start again.

## Credits
Lynchburg uses all the stuff by [Thoughtbot](https://thoughtbot.com) because they are awesome.

- [Bourbon](http://bourbon.io/)
- [Neat](http://neat.bourbon.io/)
- [Bitters](http://bitters.bourbon.io/)
