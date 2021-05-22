const DocumentationArticleAdapter = require('../../../api/DocumentationArticleAdapter')
const DocumentationRepository = require('../../../api/DocumentationRepository')

/*
Matches
@test searchQuery
@test:123 searchQuery
@test:123.123 searchQuery
@test:123.123.123 searchQuery
@test:123.123.123.123 searchQuery
*/
const nameRegex =
  /^@(?<name>[a-z-]+(:\d+(\.\d+(\.\d+)?(\.\d+)?)?)?) (?<searchQuery>.+)/i

/**
 *
 * @param {Object} options
 * @param {String} options.query
 * @param {String} options.locale
 *
 * @returns {Array}
 */
const inlineQueryExecuter = ({ query, locale }) => {
  const nameMatch = query.match(nameRegex)
  if (nameMatch) {
    const { name, searchQuery } = nameMatch.groups
    const documentation = DocumentationRepository.documentations.find(
      ({ name: docName }) => docName.toLowerCase() === name.toLowerCase(),
    )
    if (documentation) {
      return [
        new DocumentationArticleAdapter(documentation, locale, searchQuery),
      ]
    }
  }

  return DocumentationRepository.search(query).map(
    (doc) => new DocumentationArticleAdapter(doc, locale),
  )
}

module.exports = inlineQueryExecuter
