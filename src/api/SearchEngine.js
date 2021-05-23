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

    if (typeof name !== 'string') throw new Error('"name" is not string')
    if (typeof searchLink !== 'string')
      throw new Error('"searchLink" is not string')

    this.name = name
    this.searchLink = searchLink

    if (typeof icon === 'string') this.icon = icon
    if (typeof displayName === 'string') this.displayName = displayName
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
