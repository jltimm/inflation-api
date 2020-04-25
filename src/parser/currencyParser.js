module.exports = parseCurrency;

/**
 * Parses a currency from the API request, and returns
 * the normalized amount
 *
 * @param {String} rawCurrency The raw currency from the request
 * @return {JSON} The currency as a JSON object
 */
function parseCurrency(rawCurrency) {
  const currency = rawCurrency.toLowerCase().trim();
  // TODO: Temporary. Grab list from database later
  if (currency !== 'usd') {
    return {error: '[' + rawCurrency + '] is not a supported currency.'};
  }
  return {currency: currency};
}
