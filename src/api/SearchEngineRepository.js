const JsonLoader = require('./JsonLoader')

const SearchEngine = require('./SearchEngine')

class SearchEngineRepository extends JsonLoader {
  /**
   * @type {SearchEngine[]}
   */
  static _engines = []
  static _loader = new JsonLoader()

  static onDataChange() {
    this._engines = Object.values(this._loader.data)
      .map((jsons) => jsons.map((json) => new SearchEngine(json)))
      .flat()
  }

  /**
   *
   * @param {String} searchDirectory
   */
  static async load(searchDirectory) {
    this._loader.on('data-changed', this.onDataChange)
    await this._loader.load(searchDirectory)
  }

  static get engines() {
    return this._engines
  }
}

module.exports = SearchEngineRepository
