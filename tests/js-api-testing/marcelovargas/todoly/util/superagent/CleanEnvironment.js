// Clean Environment
var request = require('superagent');

var ProjectsResource = require('./../../resources/projects');
var ItemsResource = require('./../../resources/items');


/**
 * Functions to delete projects
 * @type {Object}
 */
var CleanEnvironment = {
	cleanProjects : function(cb){
		var projectsDeleted = 0;
	    ProjectsResource.getAll(function (err, projects) {
			if (projects.length == 0){
				cb();
			}
			else{
				projects.forEach(function (project) {
					ProjectsResource.delete(project.Id, function (err, project) {
						projectsDeleted++;
						if(projectsDeleted >= projects.length){
							cb();
						}
					});
				});
			}
		});
	},
	cleanNonSystemProjects : function(cb){
		var projectsDeleted = 0;
	    ProjectsResource.getAll(function (err, projects) {
			if (projects.length == 0){
				cb();
			}
			else{
				projects.forEach(function (project) {
					if (project.Icon != 0){
						projectsDeleted++;
							if(projectsDeleted >= projects.length){
								cb();
							}
					}
					else{
						ProjectsResource.delete(project.Id, function (err, project) {
							projectsDeleted++;
							if(projectsDeleted >= projects.length){
								cb();
							}
						});
					}
				});
			}
		});
	},
	cleanItems : function(cb){
		var itemsDeleted = 0;
	    ItemsResource.getAll(function (err, items) {
			if (items.length == 0){
				cb();
			}
			else{
				items.forEach(function (item) {
					ItemsResource.delete(item.Id, function (err, item) {
						itemsDeleted++;
						if(itemsDeleted >= items.length){
							cb();
						}
					});
				});
			}
		});
	}
};

module.exports = CleanEnvironment;