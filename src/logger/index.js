const logger = {
  log() {
    console.log(...arguments)
  },
  warn() {
    console.warn(...arguments)
  },
  error() {
    console.error(...arguments)
  },
  err() {
    this.error(...arguments)
  },
}

module.exports = logger
