const pm2 = require('pm2')
const webpackTask = require('./webpack.js')

const projectName = 'electron-boilerplate'
function pm2Start () {
  pm2.start({
    script: './electron/node/electron.js',
    name: projectName,
    max_memory_restart: '100M',
    exec_mode: 'cluster'
  }, function (err, apps) {
    pm2.disconnect()
    webpackTask()
    if (err) throw err
  })
}

process.on('SIGINT', function () {
  process.exit(2)
})

pm2.connect(function (err) {
  if (err) process.exit(2)
  pm2.delete(projectName, function () {
    pm2Start()
  })
})
