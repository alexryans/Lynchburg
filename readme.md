# Lynchburg

The front end starting point for our projects. It’s not a framework, it’s a starting point.

It uses all the stuff by [Thoughtbot]() because they are awesome.

* [Bourbon](http://bitters.bourbon.io/)
* [Neat](http://neat.bourbon.io/)
* [Bitters](http://bitters.bourbon.io/)

and [Codekit](https://incident57.com/codekit) to compile it all.

## What do I do with this then?

Copy it into your project then…

* Put all the files **other than** `_base.scss` from [Bitters](https://github.com/thoughtbot/bitters/tree/master/app/assets/stylesheets) into `inc/framework`.
* Delete the `.gitignore` file out of `inc/framework`.
* Copy the files from `inc/overrides` into `inc/framework` and overwrite the default.
* Delete `inc/overrides` folder.
* Copy [Normalize](https://github.com/necolas/normalize.css/blob/master/normalize.css) into `inc/framework` as `normalize.scss`.

Get building…

## Remember

There are two types of breakpoints…

### Style breakpoints

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

### Grid breakpoints

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


