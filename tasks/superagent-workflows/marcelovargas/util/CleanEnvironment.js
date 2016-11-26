// Clean Environment
var request = require('superagent');

var ProjectsResource = require('./../resources/projects');


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
	}
};

module.exports = CleanEnvironment;