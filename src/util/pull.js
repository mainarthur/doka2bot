const { exec } = require('child_process')

/**
 *
 * @param {boolean} [printStatus=true] Optional. If you want to hide logs pass false
 * @param {Console} [logger=console] Optional. You can pass your own logger
 * @returns {Promise<void>}
 */
const pull = (printStatus = true, logger = console) =>
  new Promise((resolve, reject) => {
    exec('git pull', (error, stdout, strerr) => {
      if (error) return reject(error)
      if (stdout && printStatus) logger.log(stdout)
      if (strerr && printStatus) logger.error(strerr)
      resolve()
    })
  })

module.exports = pull
