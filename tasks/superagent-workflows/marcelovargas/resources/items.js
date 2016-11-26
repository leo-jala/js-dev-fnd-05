// items.js

var request = require('superagent');

var config = require('./../config/config');
var URLs = require('./../resources/URLs');

var Items = {
  create: function (itemData, cb){
    request
      .post(URLs.getUrl('post_item'))
      .set('Authorization', config.getProperty('BASIC_TOKEN'))
      .send(itemData)
      .end(function(err, res){
        cb(err, res.body);
      });
  },
  getItemsFromProject: function(projectId, cb){
    request
      .get(URLs.getUrl('get_itemsFromProjectById').replace('[projectId]', projectId))
      .set('Authorization', config.getProperty('BASIC_TOKEN'))
      .end(function(err, res){
        cb(err, res);
      });
  },
  delete: function(itemId, cb){
    request
      .del(URLs.getUrl('delete_itemById').replace('[itemId]', itemId))
      .set('Authorization', config.getProperty('BASIC_TOKEN'))
      .end(function(err, res){
        cb(err, res);
      });
  }
};

module.exports = Items;