var _ = require('lodash')
var async = require('async')
var fs = require('fs')
var path = require('path')
var globFirst = require('./glob-first')
var log = require('../log')

module.exports = (patterns, cb) =>
  globFirst(patterns, (er, results) => {
    if (er) return cb(er)

    async.map(results,
      (result, cb) => fs.access(result, fs.constants.R_OK | fs.constants.X_OK,
        er => cb(null, er
          ? log.warn(`Ignoring script '${result}' because it was not readable/executable.\n` +
            `Run \`chmod u+rx '${result}'\` if you want scripty to run it.`)
          : path.resolve(result))
      ),
      (er, results) => cb(er, _.compact(results))
    )
  })
