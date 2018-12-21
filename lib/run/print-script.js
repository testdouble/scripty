var fs = require('fs')
var log = require('../log')

module.exports = function (scriptFile) {
  log.info(`Executing "${scriptFile}":\n`)
  log.verbose(`${read(scriptFile)}`)
}

function read (scriptFile) {
  try {
    return fs.readFileSync(scriptFile).toString()
  } catch (e) {
    log.warn(`Failed to read '${scriptFile}':\n${e.message}`)
  }
}
