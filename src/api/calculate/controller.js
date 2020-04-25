const express = require('express');
const calculateRouter = new express.Router();
const validationService = require('../validation/service.js');

calculateRouter.get('/', getInflationRate);
module.exports = calculateRouter;

/**
 * Calculates the inflation rate based on the parameters
 *
 * @param {JSON} req The request
 * @param {JSON} res The response
 */
function getInflationRate(req, res) {
  const err = validationService.validateRequest(req);
  if (!!err) {
    res.status(400).send(err);
    return;
  }
  res.send('TODO');
}
