#!/usr/bin/env node

var scripty = require('./index')
scripty(process.env.npm_lifecycle_event, {
  spawn: {
    stdio: 'inherit'
  }
}, function (er, code) {
  if (er) { throw er }
  process.exit(code)
})
