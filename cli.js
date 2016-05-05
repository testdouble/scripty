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

  scripty(lifecycleEvent, {
    userArgs: process.argv.slice(2),
    parallel: process.env['SCRIPTY_PARALLEL'] === 'true',
    dryRun: process.env['SCRIPTY_DRY_RUN'] === 'true',
    silent: process.env['SCRIPTY_SILENT'] === 'true',
    spawn: {
      stdio: 'inherit'
    },
    resolve: {
      scripts: process.env.npm_package_scripty_path,
      scriptsWin: process.env.npm_package_scripty_windowsPath
    }
  }, function (er, code) {
    if (er) { throw er }
    process.exit(code)
  })
}
