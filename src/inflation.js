const express = require('express');
const app = express();

app.use('/v1/calculate', require('./calculate/controller'));

const cache = require('./cache/cache');
cache.initialize();

if (process.argv.includes('--start')) {
  const port = process.env.PORT || 8080;
  console.log('Starting server on port ' + port);
  app.listen(port);
}

module.exports = app;
