class Documentation {
  /**
   * @param {Object} options
   * @param {String} options.name
   * @param {String} options.description
   * @param {String} options.link
   * @param {String} [options.searchLink]
   * @param {String} [options.icon]
   * @param {String} [options.keywords]
   */
  constructor({ name, description, link, searchLink, icon, keywords }) {
    if (!name) throw new Error('"name" field is required')
    if (!description) throw new Error('"description" field is required')
    if (!link) throw new Error('"link" field is required')

    if (typeof name !== 'string') throw new Error('"name" is not string')
    if (typeof description !== 'string')
      throw new Error('"description" is not string')
    if (typeof link !== 'string') throw new Error('"link" is not string')

    this.name = name
    this.description = description
    this.link = link

    if (typeof searchLink === 'string') this.searchLink = searchLink
    if (typeof icon === 'string') this.icon = icon
    if (typeof keywords === 'string') this.keywords = keywords
  }

  /**
   *
   * @param {string} query
   *
   * @returns {string}
   */
  search(query) {
    if (!this.searchLink) return this.link

    return `${this.searchLink}${encodeURIComponent(query)}`
  }

  toString() {
    return `${this.name} ${this.description} ${this.keywords}`
  }
}

module.exports = Documentation
