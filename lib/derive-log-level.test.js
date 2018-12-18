var subject = require('./derive-log-level')
var level = require('./run/log').levels

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
    assert.equal(subject({ silent: true, dryRun: true, verbose: true }), level.VERBOSE)
  },

  'dry-run preempts silent': function () {
    assert.equal(subject({ silent: true, dryRun: true }), level.INFO)
  },

  'silent is read last': function () {
    assert.equal(subject({ silent: true }), level.SILENT)
  },

  'quiet is alias for silent': function () {
    assert.equal(subject({ quiet: true }), level.SILENT)
  }
}
