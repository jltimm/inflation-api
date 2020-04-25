module.exports = parseAmount;

/**
 * Parses an amount from the API request, and returns
 * the normalized amount.
 *
 * @param {String} rawAmount The raw amount from the request
 * @return {JSON} The amount as a JSON object
 */
function parseAmount(rawAmount) {
  const amountNoCommas = rawAmount.replace(/,/g, '');
  const reg = /^-?\d*\.?\d*$/;
  if (!reg.test(amountNoCommas)) {
    return {error: 'Not a number'};
  }
  const amount = parseFloat(amountNoCommas);
  if (isNaN(amount)) {
    return {error: 'Not a number'};
  }
  if (amount <= 0) {
    return {error: 'Must be greater than zero'};
  }
  return {amount: amount};
}
