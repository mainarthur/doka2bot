const fs = require('fs')
const path = require('path')

const { JSON_EXT, DECIMAL_RADIX } = require('../constants')
const { DEFAULT_LOCALE } = require('../../config.json')
const logger = require('../logger')

// Matches "{0}", "{1}" for formatting
const insertionRegexp = /\{\d+\}/g

const locales = fs
  .readdirSync(__dirname)
  .filter((fileName) => path.extname(fileName) === JSON_EXT)
  .reduce((acc, locale) => {
    acc[path.basename(locale, JSON_EXT)] = JSON.parse(
      fs.readFileSync(path.join(__dirname, locale), 'utf-8'),
    )

    return acc
  }, {})

logger.log('Loaded locales:', locales)

/**
 *
 * @param {string} locale
 * @returns {(keys: TemplateStringsArray, ...substitutions: any[]) => string}
 */
function t18g(locale) {
  return (keys, ...substitutions) => {
    const key = keys
      .filter((key) => !!key.trim())
      .join('')
      .trim()

    /**
     * @type {string}
     */
    const text = locales?.[locale]?.[key] ?? locales?.[DEFAULT_LOCALE]?.[key]

    if (!text) return `{${key}}`

    const insertionsMatch = text.match(insertionRegexp)

    if (!(insertionsMatch && substitutions.length)) return text

    const insertions = insertionsMatch.map((insertion) => ({
      index: parseInt(insertion.substring(1, insertion.length), DECIMAL_RADIX),
      insertion,
    }))

    return insertions.reduce(
      (oldText, { insertion, index }) =>
        oldText.replace(insertion, substitutions[index]),
      text,
    )
  }
}

module.exports = t18g
