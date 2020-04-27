const constants = require('../constants/dateParserConstants');

module.exports = parseDate;

/**
 * Parses a date, and returns the normalized date if
 * it can be parsed.
 *
 * @param {String} rawDate The date as passed in the request
 * @return {JSON} The normalized date
 */
function parseDate(rawDate) {
  const isNegative = rawDate.startsWith('-');
  const splitDate = isNegative ?
      rawDate.substring(1).split('-') :
      rawDate.split('-');
  if (splitDate.length !== 2) {
    return {error: constants.mustBeYYYYMM(rawDate)};
  }
  const rawYear = isNegative ? '-' + splitDate[0] : splitDate[0];
  const rawMonth = splitDate[1];
  const reg = /^-?\d+$/;
  if (!reg.test(rawYear) || !reg.test(rawMonth)) {
    return {error: constants.invalidCharacters(rawDate)};
  }
  const year = parseInt(rawYear);
  const month = parseInt(rawMonth);
  if (month > 12 || month < 1) {
    return {error: constants.invalidMonth(rawDate)};
  }
  if (year == 0) {
    return {error: constants.yearZero(rawDate)};
  }
  return {
    year: year,
    month: month,
  };
}
