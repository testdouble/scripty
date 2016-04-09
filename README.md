# scripty

[![Build Status](https://travis-ci.org/testdouble/scripty.svg?branch=master)](https://travis-ci.org/testdouble/scripty)

## What is?

Using [npm-scripts](https://docs.npmjs.com/misc/scripts) has become a popular
way of maintaining the various build tasks needed to develop Node.js modules.
People like npm-scripts because it's simple! This is a common refrain:

> "Don't bother with grunt, gulp, or broccoli, just add a little script to your
package.json and run it with `npm run name:of:script`

Indeed, this _is_ much simpler, but it can quickly become a mess. Take a look at
what happened to our
[testdouble.js](https://github.com/testdouble/testdouble.js) library's
[package.json](https://github.com/testdouble/testdouble.js/blob/30e27f54de0e84fe99a9c33340a0474c3a21369b/package.json#L16-L42).
Using npm-scripts for everything may be simple to start with, but that doesn't
guard against being confusing and hard-to-maintain as complexity mounts over
the life of a project.

We wrote scripty so we could painlessly extract each of our scripts—particularly
the gnarly ones—into their own files without changing the command we use to run
them. To see how to do this yourself, read on!

## Install

```
$ npm install --save-dev scripty
```

## Usage

1. From your module's root, create a `scripts` directory
2. If you want to define an npm script named "foo:bar", write an executable
file at `scripts/foo/bar`. Enjoy the liberating breeze over your knuckles as
your script is allowed to roam in its own file, beyond the stuffy confines of a
quote-escaped string inside a pile of JSON
3. Declare your `"foo:bar"` script in `"scripts"` in your `package.json`:

``` json
"scripts": {
  "foo:bar": "scripty"
}
```

From this point on, you can run `npm run foo:bar` and scripty will look up
`scripts/foo/bar` and execute it for you. This pattern is great for extracting
scripts that are starting to become unwieldy inside your `package.json`, while
still explicitly calling out the scripts that your package supports (though
where to take that aspect from here is [up for
debate](https://github.com/testdouble/scripty/issues/1)).

## Advanced Usage

Ready to take things to the next level? Check this stuff out:

### Batching "sub-scripts"

Let's say you have two test tasks in `scripts/test/unit` and
`scripts/test/integration`:

``` json
"scripts": {
  "test:unit": "scripty",
  "test:integration": "scripty"
}
```

And you want `npm test` to simply run all of them, regardless of order. In that
case, just add a `"test"` entry to your `package.json` like so:

``` json
"scripts": {
  "test:unit": "scripty",
  "test:integration": "scripty",
  "test": "scripty"

}
```

And from then on, running `npm test` will result in scripty running all the
executable files it can find in `scripts/test/*`.

### Defining an explicit parent script

Suppose in the example above, it becomes important for us to run our scripts in
a particular order. Or, perhaps, when running `npm test` we need to do some other
custom scripting as well. Fear, not!

Without changing the JSON from the previous example:

``` json
"scripts": {
  "test:unit": "scripty",
  "test:integration": "scripty",
  "test": "scripty"

}
```

Defining a script named `scripts/test/index` will cause scripty to only run that
`index` script, as opposed to globbing for all the scripts it finds in
`scripts/test/*`.

## Likely questions

* If your script isn't executing, make sure it's **executable**! In UNIX, this
can be accomplished by running `chmod +x scripts/path/to/my/script`
