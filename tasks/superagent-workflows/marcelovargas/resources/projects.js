// projects.js

var request = require('superagent');

var config = require('./../config/config');
var URLs = require('./../resources/URLs');

var Projects = {
	create: function (project, cb){
		request
			.post(URLs.getUrl('post_project'))
			.set('Authorization', config.getProperty('BASIC_TOKEN'))
			.send(project)
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	get: function(projectId, cb){
		request
			.get(URLs.getUrl('get_projectById').replace('[projectId]',projectId))
			.set('Authorization', config.getProperty('BASIC_TOKEN'))
			.end(function(err, res){
				cb(err, res.body);
			});
	},
	getAll: function(cb){
		request
			.get(URLs.getUrl('get_projects'))
			.set('Authorization', config.getProperty('BASIC_TOKEN'))
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	update: function(project, cb){
		request
			.put(URLs.getUrl('put_projectById').replace('[projectId]', project.Id))
			.set('Authorization', config.getProperty('BASIC_TOKEN'))
			.send(project)
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	delete: function(projectId, cb){
		request
			.del(URLs.getUrl('delete_projectById').replace('[projectId]', projectId))
			.set('Authorization', config.getProperty('BASIC_TOKEN'))
			.end(function(err, res){
				cb(err, res.body);
			});
	}
};

module.exports = Projects;