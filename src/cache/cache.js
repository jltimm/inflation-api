const NodeCache = require('node-cache');
const usdData = require('../../data/usd.json');

/**
 * Class that holds the cache
 */
class Cache {
  /**
   * The constructor
   */
  constructor() {
    this.cache = new NodeCache();
  }

  /**
   * Returns a value from the cache
   *
   * @param {String} currency The currency
   * @param {Integer} year The year
   * @param {Integer} month The month
   * @return {Double} The value from the cache
   */
  get(currency, year, month) {
    const key = this.constructKey(currency, year, month);
    return this.cache.get(key);
  }

  /**
   * Constructs a key from the parameters
   * @param {String} currency The currenecy
   * @param {Integer} year The year
   * @param {Integer} month The month
   * @return {String} The key
   */
  constructKey(currency, year, month) {
    if (month == null) {
      month = 'avg';
    }
    return currency + ':' + year + ':' + month;
  }

  /**
   * Loads the cache with data from the JSON file
   *
   * @param {String} currency The currency
   * @param {JSON} data The data from the JSON file
   */
  loadCache(currency, data) {
    for (const year in data) {
      if (data.hasOwnProperty(year)) {
        const months = data[year];
        let runningTotal = 0.0;
        for (let i = 0; i < months.length; i++) {
          const key = this.constructKey(currency, year, (i + 1));
          const value = months[i];
          this.cache.set(key, value);
          runningTotal += value;
        }
        const avgKey = this.constructKey(currency, year, 'avg');
        const avg = runningTotal / months.length;
        this.cache.set(avgKey, avg);
      }
    }
  }

  /**
   * Initialize the cache
   */
  initialize() {
    this.loadCache('usd', usdData);
  }
}

const cache = new Cache();
module.exports = cache;
