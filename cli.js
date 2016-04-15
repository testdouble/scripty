#!/usr/bin/env node

var scripty = require('./index')
scripty(process.env.npm_lifecycle_event, {
  userArgs: process.argv.slice(2),
  spawn: {
    stdio: 'inherit'
  }
}, function (er, code) {
  if (er) { throw er }
  process.exit(code)
})
