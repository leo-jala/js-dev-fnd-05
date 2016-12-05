// filters.js

var request = require('superagent');

var config = require('./../config/config');

var Filters = {
  resource: 'filters',
  format: '.json',

  getAllItemsById: function(filterId, cb){
    request
      .get(config.getProperty('BASE_URL') + this.resource + "/" +  filterId + "/items" + this.format)
      .set('Authorization', config.getProperty('BasicToken'))
      .end(function(err, res){
        cb(err, res.body);
      });
  }
};

module.exports = Filters;