var subject = require('./load-log-level')
var level = require('./run/log').levels

module.exports = {
  beforeEach: function () {
    delete process.env.SCRIPTY_QUIET
    delete process.env.SCRIPTY_SILENT
    delete process.env.SCRIPTY_DRY_RUN
    delete process.env.SCRIPTY_VERBOSE
    delete process.env.SCRIPTY_LOG_LEVEL
  },

  'defaults to INFO': function () {
    assert.equal(subject(), level.INFO)
  },

  'explicit logLevel takes precedence': function () {
    process.env.SCRIPTY_SILENT = true
    process.env.SCRIPTY_DRY_RUN = true
    process.env.SCRIPTY_VERBOSE = true
    process.env.SCRIPTY_LOG_LEVEL = 'warn'
    assert.equal(subject(), level.WARN)
  },

  'ignores unrecognized values': function () {
    process.env.SCRIPTY_LOG_LEVEL = 'worn'
    assert.equal(subject(), level.INFO)
  },

  'verbose preempts dry-run and silent': function () {
    process.env.SCRIPTY_SILENT = true
    process.env.SCRIPTY_DRY_RUN = true
    process.env.SCRIPTY_VERBOSE = true
    assert.equal(subject(), level.VERBOSE)
  },

  'dry-run preempts silent': function () {
    process.env.SCRIPTY_SILENT = true
    process.env.SCRIPTY_DRY_RUN = true
    assert.equal(subject(), level.INFO)
  },

  'silent is read last': function () {
    process.env.SCRIPTY_SILENT = true
    assert.equal(subject(), level.SILENT)
  },

  'quiet is alias for silent': function () {
    process.env.SCRIPTY_QUIET = true
    assert.equal(subject(), level.SILENT)
  }
}
