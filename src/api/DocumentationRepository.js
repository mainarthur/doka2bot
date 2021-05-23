const Documentation = require('./Documentation')

const getWordsOccurrencesCount = require('../util/getWordsOccurrencesCount')
const JsonLoader = require('./JsonLoader')

class DocumentationRepository {
  /**
   * @type {Documentation[]}
   */
  static _documentations = []
  static _loader = new JsonLoader()

  static onDataChange() {
    this._documentations = Object.values(this._loader.data)
      .map((jsons) => jsons.map((json) => new Documentation(json)))
      .flat()
  }

  /**
   *
   * @param {String} documentationDirectory
   */
  static async load(documentationDirectory) {
    this._loader.on('data-changed', this.onDataChange)
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
