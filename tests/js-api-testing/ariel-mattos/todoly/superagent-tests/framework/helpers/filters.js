// projects.js

var request = require('superagent');

var config = require('./../config/config');
var FiltersResource = require('./../resources/filters');
var ItemsResource = require('./../resources/items');

var Filters = {
  cleanUp: function (cb) {
    var deletedItems = 0;
    var inboxId = 0;
    FiltersResource.getItems(inboxId, function (err, itemsInInbox) {
      if (itemsInInbox.length == 0){
        cb();
      }
      itemsInInbox.forEach(function (item) {
        ItemsResource.delete(item.Id, function (err, deletedItem) {
          deletedItems++;
          //console.log(projectsDeleted, ' --- Project', project.Content, 'was deleted!');
          if(deletedItems >= itemsInInbox.length) {
            cb();
          }
        });
      });
    })
  }
};

module.exports = Filters;