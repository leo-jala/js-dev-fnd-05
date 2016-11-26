// users.js

var request = require('superagent');

var config = require('./../config/config');
var URLs = require('./../resources/URLs');

var Filters = {
	getAll: function(cb){
	request
		.get(URLs.getUrl('get_filters'))
      	.set('Authorization', config.getProperty('BASIC_TOKEN'))
		.end(function(err, res){
			cb(err, res);
		});
	},
	get: function(filterId, cb){
	request
		.get(URLs.getUrl('get_filtersById').replace('[filterId]', filterId))
      	.set('Authorization', config.getProperty('BASIC_TOKEN'))
		.end(function(err, res){
			cb(err, res);
		});
	}
};

module.exports = Filters;