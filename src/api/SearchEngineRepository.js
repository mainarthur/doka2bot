const JsonLoader = require('./JsonLoader')

const SearchEngine = require('./SearchEngine')

class SearchEngineRepository extends JsonLoader {
  /**
   * @type {SearchEngine[]}
   */
  static _engines = []
  static _loader = new JsonLoader()

  /**
   *
   * @param {String} searchDirectory
   */
  static async load(searchDirectory) {
    this._loader.on(JsonLoader.DATA_CHANGED, (data) => {
      this._engines = Object.values(data)
        .map((jsons) => jsons.map((json) => new SearchEngine(json)))
        .flat()
    })
    await this._loader.load(searchDirectory)
  }

  static get engines() {
    return this._engines
  }
}

module.exports = SearchEngineRepository
