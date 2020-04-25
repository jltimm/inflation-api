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
    return {error: 'Date must be of the form YYYY-MM'};
  }
  const rawYear = isNegative ? '-' + splitDate[0] : splitDate[0];
  const rawMonth = splitDate[1];
  const reg = /^-?\d+$/;
  if (!reg.test(rawYear) || !reg.test(rawMonth)) {
    return {error: 'Invalid characters found'};
  }
  const year = parseInt(rawYear);
  const month = parseInt(rawMonth);
  if (month > 12 || month < 1) {
    return {error: 'Month must be between 1 and 12'};
  }
  if (year == 0) {
    return ({error: 'Year must not be zero'});
  }
  return {
    year: year,
    month: month,
  };
}
