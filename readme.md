# Lynchburg

The front end starting point for our projects. It’s not a framework, it’s a starting point.

It uses all the stuff by [Thoughtbot]() because they are awesome.

* [Bourbon](http://bourbon.io/)
* [Neat](http://neat.bourbon.io/)
* [Bitters](http://bitters.bourbon.io/)

and [Codekit](https://incident57.com/codekit) to compile it all.

*N.B.* If you'd like, you can also couple this with our [Gulp](http://github.com/LabelMedia/gulp) repo, which will handle compilation and minification, as well as a lot of other cool stuff, rather than using Codekit.

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

#### Footnote
If you are dorky enough to run `setup.sh` on your Lynchburg maintenance project you'll lose everything that has not been pushed to github. You'll have to do a new git clone and make any changes and start again.
