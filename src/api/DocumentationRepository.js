const fsp = require('fs/promises')
const path = require('path')

const Documentation = require('./Documentation')

const logger = require('../logger')
const { JSON_EXT } = require('../constants')
const getWordsOccurrencesCount = require('../util/getWordsOccurrencesCount')

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
    const documentationFiles = files.filter(
      (fileName) => fileName.endsWith(JSON_EXT) && !fileName.startsWith('.'),
    )

    for (const fileName of documentationFiles) {
      try {
        const src = await fsp.readFile(
          path.join(documentationDirectory, fileName),
          'utf-8',
        )

        const json = JSON.parse(src)
        if (Array.isArray(json)) {
          json.forEach((doc) =>
            this._documentations.push(new Documentation(doc)),
          )
        } else {
          this._documentations.push(new Documentation(json))
        }
      } catch (err) {
        logger.err(err)
      }
    }
  }

  static get documentations() {
    return this._documentations
  }

  /**
   * @param {String} searchQuery
   * @returns {Array<Documentation>}
   */
  static search(searchQuery) {
    if (!searchQuery) return this._documentations

    return this._documentations.sort(
      (docA, docB) =>
        getWordsOccurrencesCount(docB.toString(), searchQuery) -
        getWordsOccurrencesCount(docA.toString(), searchQuery),
    )
  }
}

module.exports = DocumentationRepository
