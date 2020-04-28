const usdData = require('../../data/usd.json');

module.exports = {getInflationRate};

/**
 * Calculates the inflation rate
 *
 * @param {JSON} request The request
 * @return {JSON} The response
 */
function getInflationRate(request) {
  const startPrice =
      usdData[request.startDate.year][request.startDate.month - 1];
  const endPrice = usdData[request.endDate.year][request.endDate.month - 1];
  const multiplyingFactor = endPrice / startPrice;
  const percent = ((endPrice - startPrice) / startPrice) * 100.0;
  const inflatedAmount = request.amount * multiplyingFactor;
  const response = request;
  response.percentChange = parseFloat(percent.toFixed(2));
  response.result = parseFloat(inflatedAmount.toFixed(2));
  return response;
}
