const { exec } = require('child_process')

const pull = () =>
  new Promise((resolve, reject) => {
    exec('git pull', (error, stdout, strerr) => {
      if (error) return reject(error)
      if (stdout) console.log(stdout)
      if (strerr) console.error(strerr)
      resolve()
    })
  })

module.exports = pull
