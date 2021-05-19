/**
 * @param {*} arg
 * @returns {arg is string}
 */
const isString = (arg) => {
  // checks new String(...) too
  return typeof arg === 'string' || arg?.constructor === String
}

/**
 * @param {*} arg
 * @returns {arg is boolean} true if arg is boolean
 */
const isBoolean = (arg) => {
  return typeof arg === 'boolean'
}

/**
 *
 * @param {*} arg
 * @returns {arg is number} true if arg is integer
 */
const isInteger = (arg) => {
  return (
    arg === parseInt(arg) &&
    typeof arg === 'number' &&
    arg > Number.MIN_SAFE_INTEGER &&
    arg < Number.MAX_SAFE_INTEGER
  )
}

module.exports = { isString, isBoolean, isInteger }
