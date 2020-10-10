const spawn = require('cross-spawn')

spawn.sync('npm', ['run', 'dev:electron'], { stdio: 'inherit' })
