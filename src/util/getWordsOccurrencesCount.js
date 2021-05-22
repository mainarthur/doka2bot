const arrayCount = require('./arrayCount')

/**
 *
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
const includeCompare = (a, b) => a.includes(b)

/**
 * Counts words occurrences from str2 in str1
 * @param {String} str1
 * @param {String} str2
 *
 * @returns {Number}
 */
const getWordsOccurrencesCount = (str1, str2) => {
  const words1 = str1.split(' ')
  const words2 = str2.split(' ')

  return words2.reduce(
    (acc, word) => arrayCount(words1, word, includeCompare) + acc,
    0,
  )
}

module.exports = getWordsOccurrencesCount
