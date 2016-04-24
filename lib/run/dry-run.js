var _ = require('lodash')

var printScript = require('./print-script')
var log = require('./log')

module.exports = function (scriptFiles, cb) {
  log('This is a dry run. Executed scripts would be:\n')
  _.map(scriptFiles, printScript)
  cb(null, 0)
}
