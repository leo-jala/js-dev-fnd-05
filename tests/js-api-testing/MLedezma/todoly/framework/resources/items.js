// items.js

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
  update: function(itemData, cb){
    request
      .put(config.getProperty('BASE_URL') + this.resource + "/" + itemData.Id + this.format)
      .set('Authorization', config.getProperty('BasicToken'))
      .send(itemData)
      .end(function(err, res){
        cb(err, res.body);
      });
  }
  /*,
  get: function(projectId, cb){
    request
      .get(config.getProperty('BASE_URL') + this.resource + '/' + projectId + this.format)
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
  update: function(project, cb){
    request
      .put(config.getProperty('BASE_URL') + 'projects/' + project.Id + '.json')
      .set('Authorization', config.getProperty('BasicToken'))
      .send(project)
      .end(function(err, res){
        cb(err, res.body);
      });
  },
  delete: function(projectId, cb){
    request
      .del(config.getProperty('BASE_URL') + 'projects/' + projectId + '.json')
      .set('Authorization', config.getProperty('BasicToken'))
      .end(function(err, res){
        cb(err, res.body);
      });
  }*/
};

module.exports = Items;