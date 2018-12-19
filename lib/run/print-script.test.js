var path = require('path')

var log = require('../log')

module.exports = {
  beforeEach: function () {
    log.level = 'silent'
    this.subject = require('./print-script')
  },
  happyPath: function () {
    var script = path.resolve('scripts/test/debug')

    this.subject(script)

    assert.includes(log.read(), 'scripty > Executing "' + script + '":\n')
    assert.includes(log.read(), 'scripty > #!/usr/bin/env sh')
    assert.includes(log.read(), 'scripty > npm test -- --debug-brk')
  },
  sadPath: function () {
    var script = '/silly/nonsense'

    this.subject(script)

    assert.includes(log.read(), `scripty WARN Failed to read '/silly/nonsense':`)
    assert.includes(log.read(), `scripty WARN ENOENT`)
  }
}
