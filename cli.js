#!/usr/bin/env node

var lifecycleEvent = process.env.npm_lifecycle_event

if (!lifecycleEvent) {
  console.error(
    'Error: scripty - it seems you may be running scripty from the ' +
    'command-line directly.\n' +
    'At this time, scripty can only be run within an ' +
    'npm script specified in your package.json.\n\n' +
    'Example package.json entry:\n\n' +
    '  "scripts": {\n' +
    '    "foo:bar": "scripty"\n' +
    '  }\n\n' +
    'And then run via `npm run foo:bar`.\n\n' +
    'For more documentation, see:\n' +
    '  https://github.com/testdouble/scripty\n\n' +
    'Exiting.'
  )
  process.exit(1)
} else {
  var scripty = require('./lib/scripty')
  var loadOption = require('./lib/load-option')

  scripty(lifecycleEvent, {
    userArgs: process.argv.slice(2),
    parallel: loadOption('parallel'),
    dryRun: loadOption('dryRun'),
    silent: loadOption('silent'),
    spawn: {
      stdio: 'inherit'
    },
    resolve: {
      scripts: loadOption('path'),
      scriptsWin: loadOption('windowsPath')
    }
  }, function (er, code) {
    process.exitCode = code
  })
}
