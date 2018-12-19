var subject = require('./derive-log-level')
var log = require('./log')

module.exports = {
  'does not default': function () {
    assert.equal(subject(), undefined)
  },

  'explicit logLevel takes precedence': function () {
    assert.equal(subject({
      silent: true,
      dryRun: true,
      verbose: true,
      logLevel: 'warn' }), 'warn')
  },

  'passes through unrecognized values': function () {
    assert.equal(subject({ logLevel: 'worn' }), 'worn')
  },

  'verbose preempts dry-run and silent': function () {
    assert.equal(subject({ silent: true, dryRun: true, verbose: true }), log.verbose)
  },

  'dry-run preempts silent': function () {
    assert.equal(subject({ silent: true, dryRun: true }), log.info)
  },

  'silent is read last': function () {
    assert.equal(subject({ silent: true }), log.silent)
  },

  'quiet is alias for silent': function () {
    assert.equal(subject({ quiet: true }), log.silent)
  }
}
