module.exports = {mustBeYYYYMM, invalidCharacters, invalidMonth, yearZero};

/**
 * Returns the bad format error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function mustBeYYYYMM(value) {
  return `[${value}] must be of the form YYYY-MM`;
}

/**
 * Returns the invalid characters error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function invalidCharacters(value) {
  return `[${value}] contains invalid characters`;
}

/**
 * Returns the invalid month error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function invalidMonth(value) {
  return `[${value}] month must be between 1 and 12`;
}

/**
 * Returns the year zero error
 *
 * @param {String} value The bad value
 * @return {String} The formatted error
 */
function yearZero(value) {
  return `[${value}] year must not be zero`;
}
