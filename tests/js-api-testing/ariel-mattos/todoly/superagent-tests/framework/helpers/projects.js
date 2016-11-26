// projects.js

var request = require('superagent');

var config = require('./../config/config');
var ProjectsResource = require('./../resources/projects');

var Projects = {
  cleanUp: function (cb) {
    var projectsDeleted = 0;
    ProjectsResource.getAll(function (err, projects) {
      //for (var i = 0; i < projects.length; i++) {
      //  ProjectsResource.delete(projects[i].Id, function (err, project) {
      //    projectsDeleted++;
      //    console.log(projectsDeleted, ' --- Project', project.Content, 'was deleted!');
      //    if(projectsDeleted >= projects.length) {
      //      cb();
      //    }
      //  });
      //}
      if (projects.length == 0){
        cb();
      }
      projects.forEach(function (project) {
        ProjectsResource.delete(project.Id, function (err, project) {
          projectsDeleted++;
          //console.log(projectsDeleted, ' --- Project', project.Content, 'was deleted!');
          if(projectsDeleted >= projects.length) {
            cb();
          }
        });
      });
    })
  }
};

module.exports = Projects;