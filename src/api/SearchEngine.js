class SeaerchEngine {
  /**
   *
   * @param {Object} options
   * @param {String} options.name
   * @param {String} options.searchLink
   * @param {String} [options.icon]
   * @param {String} [options.displayName]
   */
  constructor({ name, searchLink, icon, displayName }) {
    if (!name) throw new Error('"name" is required')
    if (!searchLink) throw new Error('"searchLink" is required')
    this.name = name
    this.searchLink = searchLink
    this.icon = icon
    this.displayName = displayName
  }

  /**
   *
   * @param {String} query
   * @returns {String}
   */
  search(query) {
    return `${this.searchLink}${encodeURIComponent(query)}`
  }
}

module.exports = SeaerchEngine
