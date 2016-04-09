module.exports = function (result) {
  result.stdout = ''
  result.stderr = ''
  return function (childProcess) {
    childProcess.stdout.on('data', function (text) {
      result.stdout += text.toString()
    })
    childProcess.stderr.on('data', function (text) {
      result.stderr += text.toString()
    })
  }
}
