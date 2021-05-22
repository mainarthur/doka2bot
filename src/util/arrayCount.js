/**
 * @callback Compare
 * @param {any} a
 * @param {any} b
 * @returns {Boolean}
 *
 * @param {any[]} array
 * @param {any} searchValue
 * @param {Compare} compare
 * @returns {Number}
 */
const arrayCount = (array, searchValue, compare) =>
  array.reduce((acc, value) => (compare(value, searchValue) ? acc + 1 : acc), 0)

module.exports = arrayCount
