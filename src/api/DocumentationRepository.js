const fsp = require('fs/promises')
const path = require('path')

const Documentation = require('./Documentation')

const logger = require('../logger')
const { JSON_EXT } = require('../constants')

class DocumentationRepository {
  /**
   * @type {Documentation[]}
   */
  static _documentations = []
  /**
   *
   * @param {string} documentationDirectory
   */
  static async load(documentationDirectory) {
    const files = await fsp.readdir(documentationDirectory)
    const documentationFiles = files.filter((fileName) =>
      fileName.endsWith(JSON_EXT),
    )

    for (const fileName of documentationFiles) {
      try {
        const src = await fsp.readFile(
          path.join(documentationDirectory, fileName),
          'utf-8',
        )

        const json = JSON.parse(src)

        this._documentations.push(new Documentation(json))
      } catch (err) {
        logger.err(err)
      }
    }
  }

  static search() {}
}

module.exports = DocumentationRepository
