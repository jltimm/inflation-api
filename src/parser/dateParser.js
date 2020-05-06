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
  if (splitDate.length > 3 || splitDate.length < 1) {
    return {error: constants.mustBeYYYYMMDD(rawDate)};
  }
  const isYYYY = splitDate.length === 1;
  const isYYYYMM = splitDate.length === 2;
  const isYYYYMMDD = splitDate.length === 3;
  if (isYYYY) {
    splitDate.push(1);
    splitDate.push(1);
  }
  if (isYYYYMM) {
    splitDate.push(1);
  }
  const rawYear = isNegative ? '-' + splitDate[0] : splitDate[0];
  const rawMonth = splitDate[1];
  const rawDay = splitDate[2];
  const reg = /^-?\d+$/;
  if (!reg.test(rawYear) || !reg.test(rawMonth) || !reg.test(rawDay)) {
    return {error: constants.invalidCharacters(rawDate)};
  }
  const year = parseInt(rawYear);
  const month = parseInt(rawMonth);
  const day = parseInt(rawDay);
  if (month > 12 || month < 1) {
    return {error: constants.invalidMonth(rawDate)};
  }
  if (year == 0) {
    return {error: constants.yearZero(rawDate)};
  }
  if (!isValid(day, month, year)) {
    return {error: constants.invalidDays(rawDate)};
  }
  const parsedDate = {
    year: year,
  };
  if (isYYYYMM || isYYYYMMDD) {
    parsedDate.month = month;
  }
  if (isYYYYMMDD) {
    parsedDate.day = day;
  }
  return parsedDate;
}

/**
 * Returns the max number of days in a month
 *
 * @param {Integer} m The month
 * @param {Integer} y The year
 * @return {Integer} The max day for the month
 */
function daysInMonth(m, y) {
  switch (m) {
    case 2:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 9: case 4: case 6: case 11:
      return 30;
    default:
      return 31;
  }
}

/**
 * Validates if the day does not exceed what it can actually be
 *
 * @param {Integer} d The day
 * @param {Integer} m The month
 * @param {Integer} y The year
 * @return {Boolean} If the day is legit or not
 */
function isValid(d, m, y) {
  return m > 0 && m <= 12 && d > 0 && d <= daysInMonth(m, y);
}
