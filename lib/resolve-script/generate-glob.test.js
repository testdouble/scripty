module.exports = function () {
  var subject = require('./generate-glob')

  assert.equal('/foo/bar*', subject('/foo', 'bar'))
}
