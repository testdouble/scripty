var path = require('path')

var log = require('./log')

module.exports = {
  beforeEach: function () {
    log.shush()
    this.subject = require('./print-script')
  },
  happyPath: function () {
    var script = path.resolve('scripts/test/debug')

    this.subject(script)

    assert.includes(log.read(), 'Executing "' + script + '":\n')
    assert.includes(log.read(), '> #!/usr/bin/env sh')
    assert.includes(log.read(), '> npm test -- --debug-brk')
  },
  sadPath: function () {
    var script = '/silly/nonsense'

    this.subject(script)

    assert.includes(log.read(), 'Error: scripty - failed trying to read "/silly/nonsense":')
    assert.includes(log.read(), 'ENOENT')
  }
}
