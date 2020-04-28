const express = require('express');
const calculateRouter = new express.Router();
const validationService = require('../validation/requestValidator.js');
const calculateService = require('./service');

calculateRouter.get('/', getInflationRate);
module.exports = calculateRouter;

/**
 * Calculates the inflation rate based on the parameters
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getInflationRate(req, res) {
  const response = validationService.validateRequest(req);
  if (!!response.errors) {
    res.status(400).send(response);
    return;
  }
  res.send(calculateService.getInflationRate(response));
}
