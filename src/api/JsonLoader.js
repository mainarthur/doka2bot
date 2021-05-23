const EventEmitter = require('events')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')

const { JSON_EXT } = require('../constants')
const { WATCHER_DELAY } = require('../../config.json')
const logger = require('../logger')

class JsonLoader extends EventEmitter {
  data = {}

  /**
   *
   * @param {String} directory
   */
  async load(directory) {
    const files = await fsp.readdir(directory)
    const jsonFiles = files.filter(
      (fileName) => fileName.endsWith(JSON_EXT) && !fileName.startsWith('.'),
    )

    for (const fileName of jsonFiles) {
      if (!this.data[fileName]) this.data[fileName] = []
      try {
        await this.readFile(directory, fileName)
      } catch (err) {
        logger.err(err)
      }
    }

    let timerId

    fs.watch(directory, (event, fileName) => {
      logger.log('watcher', { event, fileName })
      if (!fileName.endsWith(JSON_EXT) || fileName.startsWith('.')) return
      clearTimeout(timerId)
      timerId = setTimeout(async () => {
        console.log({ event, fileName })
        if (event === 'change') {
          this.data[fileName] = []

          await this.readFile(directory, fileName)
        }

        if (event === 'rename') {
          try {
            await fsp.access(path.join(directory, fileName))
          } catch (err) {
            delete this.data[fileName]
            this.emit('data-changhed')
          }
        }
      }, WATCHER_DELAY)
    })
  }

  /**
   *
   * @param {String} directory
   * @param {String} fileName
   */
  async readFile(directory, fileName) {
    const src = await fsp.readFile(path.join(directory, fileName), 'utf-8')

    const json = JSON.parse(src)
    if (Array.isArray(json)) {
      json.forEach((doc) => this.data[fileName].push(doc))
    } else {
      this.data[fileName].push(json)
    }

    this.emit('data-changhed')
  }
}

module.exports = JsonLoader
