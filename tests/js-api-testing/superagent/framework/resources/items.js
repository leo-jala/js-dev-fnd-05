// projects.js

var request = require('superagent');

var config = require('./../config/config');

var Items = {
  resource: 'items',
  format: '.json',
  create: function (itemData, cb){
    request
      .post(config.getProperty('BASE_URL') + this.resource + this.format)
      .set('Authorization', config.getProperty('BasicToken'))
      .send(itemData)
      .end(function(err, res){
        cb(err, res.body);
      });
  },
  get: function(itemId, cb){
    request
      .get(config.getProperty('BASE_URL') + this.resource + '/' + itemId + this.format)
      .set('Authorization', config.getProperty('BasicToken'))
      .end(function(err, res){
        cb(err, res.body);
      });
  },
  getAll: function(cb){
    request
      .get(config.getProperty('BASE_URL') + this.resource + this.format)
      .set('Authorization', config.getProperty('BasicToken'))
      .end(function(err, res){
        cb(err, res.body);
      });
  },
  getFiltered: function(filter, cb){
    request
        .get(config.getProperty('BASE_URL') +"filters/"+filter+ this.resource + this.format)
        .set('Authorization', config.getProperty('BasicToken'))
        .end(function(err, res){
          cb(err, res.body);
        });
  },
  update: function(itemId, itemData, cb){
    request
      .put(config.getProperty('BASE_URL') + this.resource+'/' + itemId + '.json')
      .set('Authorization', config.getProperty('BasicToken'))
      .send(itemData)
      .end(function(err, res){
        cb(err, res.body);
      });
  },
  delete: function(itemId, cb){
    request
      .del(config.getProperty('BASE_URL') + this.resource+'/' + itemId+ '.json')
      .set('Authorization', config.getProperty('BasicToken'))
      .end(function(err, res){
        console.log("bodyy: ");
        cb(err, res.body);
      });
  }
};

module.exports = Items;