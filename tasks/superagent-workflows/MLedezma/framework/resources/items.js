// items.js

var request = require('superagent');

var config = require('./../config/config');

var Items = {
	resource: 'items',
	format: '.json',
	addItems: function(newItems, cb){
		request
			.post(config.BASE_URL + this.resource + '/' +  this.format)
			.set('Authorization', config.BasicToken)
			.send(newItems)
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	update: function(updatedItem, cb){
		request
			.post(config.BASE_URL + this.resource + '/'+ updatedItem.ProjectId +  this.format)
			.set('Authorization', config.BasicToken)
			.send(updatedItem)
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	delete: function(itemId, cb){
		request
			.del(config.BASE_URL + this.resource + '/'+ itemId +  this.format)
			.set('Authorization', config.BasicToken)
			.end(function(err, res){
				cb(err, res.body);
			});
	}
};

module.exports = Items;