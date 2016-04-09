var path = require('path')

module.exports = {
  beforeEach: function () {
    this.log = td.replace('./log')
    this.subject = require('./print-script')
  },
  happyPath: function () {
    var script = path.resolve('scripts/test/debug')

    this.subject(script)

    td.verify(this.log('Executing "' + script + '":\n'))
    td.verify(this.log(
      '> #!/usr/bin/env sh\n' +
      '> \n' +
      '> npm test -- --debug-brk\n' +
      '> \n' +
      '\n'
    ))
  },
  sadPath: function () {
    var script = '/silly/nonsense'

    assert.throws(function () {
      this.subject(script)
    }.bind(this), /scripty - failed trying to read "\/silly\/nonsense"/)
  }
}
