module.exports = function () {
  var subject = require('./generate-glob')

  assert.equal('/foo/bar*', subject('/foo', 'bar'))
  assert.equal('/foo/bar/baz*', subject('/foo', 'bar:baz'))
}
