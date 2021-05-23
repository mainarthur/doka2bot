const fsp = require('fs/promises')
const path = require('path')
const { JSON_EXT } = require('../constants')
const logger = require('../logger')
const SeaerchEngine = require('./SearchEngine')

class SearchEngineRepository {
  /**
   * @type {SeaerchEngine[]}
   */
  static _engines = []

  /**
   *
   * @param {String} enginesDirectory
   *
   */
  static async load(enginesDirectory) {
    const files = await fsp.readdir(enginesDirectory)
    const searchEngineFiles = files.filter(
      (fileName) => fileName.endsWith(JSON_EXT) && !fileName.startsWith('.'),
    )

    for (const fileName of searchEngineFiles) {
      try {
        const src = await fsp.readFile(
          path.join(enginesDirectory, fileName),
          'utf-8',
        )

        const json = JSON.parse(src)
        if (Array.isArray(json)) {
          json.forEach((doc) => this._engines.push(new SeaerchEngine(doc)))
        } else {
          this._engines.push(new SeaerchEngine(json))
        }
      } catch (err) {
        logger.err(err)
      }
    }
  }

  static get engines() {
    return this._engines
  }
}

module.exports = SearchEngineRepository
