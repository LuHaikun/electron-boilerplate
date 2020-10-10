const spawn = require('cross-spawn')

module.exports = () => {
  spawn.sync('npm', ['run', 'dev'], { stdio: 'inherit' })
}
