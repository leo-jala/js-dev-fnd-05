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
  },
  update: function(item, cb){
    request
      .put(URLs.getUrl('put_itemById').replace('[itemId]', item.Id))
      .set('Authorization', config.getProperty('BASIC_TOKEN'))
      .send(item)
      .end(function(err, res){
        cb(err, res);
      });
  },
  getAll: function(cb){
    request
      .get(URLs.getUrl('get_items'))
      .set('Authorization', config.getProperty('BASIC_TOKEN'))
      .end(function(err, res){
        cb(err, res.body);
      });   
  },
  getTodayItems: function(cb){
    request
      .get(URLs.getUrl('get_itemsToday'))
      .set('Authorization', config.getProperty('BASIC_TOKEN'))
      .end(function(err, res){
        cb(err, res);
      });   
  },
  getRecycleBinItems: function(cb){
    request
      .get(URLs.getUrl('get_recycleBin'))
      .set('Authorization', config.getProperty('BASIC_TOKEN'))
      .end(function(err, res){
        cb(err, res.body.Items);
      }); 
  }
};

module.exports = Items;