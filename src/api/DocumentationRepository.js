const Documentation = require('./Documentation')
const JsonLoader = require('./JsonLoader')

const getWordsOccurrencesCount = require('../util/getWordsOccurrencesCount')

class DocumentationRepository {
  /**
   * @type {Documentation[]}
   */
  static _documentations = []
  static _loader = new JsonLoader()

  /**
   *
   * @param {String} documentationDirectory
   */
  static async load(documentationDirectory) {
    this._loader.on(JsonLoader.DATA_CHANGED, (data) => {
      this._documentations = Object.values(data)
        .map((jsons) => jsons.map((json) => new Documentation(json)))
        .flat()
    })
    await this._loader.load(documentationDirectory)
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
