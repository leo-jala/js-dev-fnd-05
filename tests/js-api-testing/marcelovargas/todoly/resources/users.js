// users.js

var request = require('superagent');

var config = require('./../config/config');
var URLs = require('./../resources/URLs');

var Users = {
	create: function (userData, cb){
	request
		.post(URLs.getUrl('post_user'))
		.send(userData)
		.end(function(err, res){
			cb(err, res);
		});
	},
	get: function(token, cb){
	request
		.get(URLs.getUrl('get_user'))
		.set('Authorization', token)
		.end(function(err, res){
			cb(err, res);
		});
	},
	delete: function(token, cb){
	request
		.get(URLs.getUrl('delete_user'))
		.set('Authorization', token)
		.end(function(err, res){
			cb(err, res);
		});
	}
};

module.exports = Users;