var exec = require('child_process').exec
var path = require('path')

module.exports = function (done) {
  var exampleTestRun = exec('npm test', {
    cwd: path.resolve(__dirname, '../../example')
  })

  var stdout = ''
  exampleTestRun.stdout.on('data', function (text) {
    stdout += text
  })

  exampleTestRun.on('close', function (code) {
    assert.equal(code, 0)
    assert.includes(stdout, 'Some Example Project')
    done()
  })
}
