# Lynchburg

"It’s not a framework, it’s a starting point."

It uses all the stuff by [Thoughtbot]() because they are awesome.

* [Bourbon](http://bourbon.io/)
* [Neat](http://neat.bourbon.io/)
* [Bitters](http://bitters.bourbon.io/)

## What do I do with this then?

Copy it into your project then…

Open Terminal and `cd` into your web folder that contains the Lynchburg `inc` folder.

Run the setup.sh script with `sh setup.sh`.

__Warning__: Do not run on your [Lynchburg](https://github.com/LabelMedia/Lynchburg) clone as it will delete all your version control! This is designed to be run within your working website projects.

Running setup will:

* Clone [Bitters](https://github.com/thoughtbot/bitters).
* Copy the Bitters stylesheets into `inc/scss/framework/`
* Delete Bitters `_base.scss` and `_grid-settings.scss` files.
* Copy our `_grid-settings.scss` into `inc/scss/framework/`
* Delete the Bitters clone.
* Delete our `overrides` folder.
* Clone [Normalize](https://github.com/necolas/normalize.css)
* Copy and rename `normalize.css` to `inc/scss/framework/_normalize.scss`
* Delete normalize clone.
* Delete `.git` folder.
* Delete `inc/scss/framework/.gitignore`
* Delete the `setup.sh` file.

Get building…

## Remember

There are two types of breakpoints…

### Infinite Breakpoints

Apply from 0 and up and overwrite the previous.

```
@include media($m-up) {
    padding: 10px; }
```

compiles to… (note min-width only media queries)

```
@media screen and (min-width: 20.0625em) {
  padding: 10px; }
```

### Specific Breakpoints

Apply between two specific points.

```
@include media($s-m) {
    margin: 20px; }
```

compiles to… (note between min-width and max-width media queries)

```
@media screen and (min-width: 20.0625em) and (max-width: 48.0625em) {
  margin: 20px; }
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

### What's occurin'?
This system is essentially an automated build tool which takes
care of the following tasks:

#### Bower
- Checks and prunes installed Bower components and flushes out
 any which are no longer in use.
- Installs any new Bower dependencies added to the `bower.json`
 file since the `gulp` task was last run.

#### Compilation
- Compiles and minifies Sass to CSS and moves the compiled file to `./public/inc/css`.
- Lints Sass for formatting.
- Lints JS for formatting.
- Concatonates and minifies JS files into one `app.min.js` file.
- Compresses raw images and moves them to `./public/inc/img`.
- Moves fonts to `./public/inc/fonts`.

The build sequence also 'watches' the source files for Sass, JS, font and image files, rerunning the appropriate tasks whenever a change is made to one of the watched files/folders.

### What do I do with this?
It's simple! All you have to is make sure you have `node`, 
`npm` and `gulp` installed, then it's as simple as running `npm install` 
and `gulp`.

`npm install` will look at all the dependencies required by 
the project and install them to `./node_modules`, and 
running `gulp` for the first time will install any Bower 
dependencies required by the project, putting them into 
`./bower_components`.

The full initial install and configuration is as follows, 
using [Homebrew](http://brew.sh/) to install some system 
dependencies:
- `brew install node`
- `npm install gulp -g`
- `npm install`
- `gulp`

#### Important!
You'll also have to make sure you have Ruby and scss-lint installed in order for the `styles:lint` task to run successfully:
- `brew install ruby`
- `gem install scss_lint`

Finally, you'll need to make sure you have the `.scss-lint.yml` config file in your project. The file itself begins with a `.`, so it'll be hidden in your file structure unless you can see hidden files in your file explorer window.

### Input and output
You can define your source and compilation locations in `gulpfile.js`, in the main config block - just look for the `resources` and `output` arrays.

### Helpful resources
- [scss-lint documentation](https://github.com/brigade/scss-lint)
- [scss-lint config documentation](https://github.com/brigade/scss-lint/tree/master/lib/scss_lint/linter)

#### Footnote
If you are dorky enough to run `setup.sh` on your Lynchburg maintenance project you'll lose everything that has not been pushed to github. You'll have to do a new git clone and make any changes and start again.
