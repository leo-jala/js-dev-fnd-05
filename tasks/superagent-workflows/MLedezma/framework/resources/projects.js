// projects.js

var request = require('superagent');

var config = require('./../config/config');

var Projects = {
	resource: 'projects',
	format: '.json',
	create: function (project, cb){
		request
			.post(config.BASE_URL + this.resource + this.format)
			.set('Authorization', config.BasicToken)
			.send(project)
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	get: function(projectId, cb){
		request
			.get(config.BASE_URL + this.resource + '/' + projectId + this.format)
			.set('Authorization', config.BasicToken)
			.end(function(err, res){
				cb(err, res.body);
			});
	},
	getAll: function(cb){
		request
			.get(config.BASE_URL + this.resource + this.format)
			.set('Authorization', config.BasicToken)
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	update: function(project, cb){
		request
			.put(config.BASE_URL + 'projects/' + project.Id + '.json')
			.set('Authorization', config.BasicToken)
			.send(project)
			.end(function(err, res){
				cb(err, res.body);
			});		
	},
	delete: function(projectId, cb){
		request
			.del(config.BASE_URL + 'projects/' + projectId + '.json')
			.set('Authorization', config.BasicToken)
			.end(function(err, res){
				cb(err, res.body);
			});
	}
};

module.exports = Projects;