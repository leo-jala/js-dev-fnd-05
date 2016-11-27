/*
New project created is listed in all projects
  Given I have at least one project created in my account
  When I create a project
  Then I should be able to see it in my list of projects
 */

var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;
var ProjectsHelper = TodoLy.helpers.projects;

describe('Todo.ly', function () {

  describe('Workflow specs', function () {

    describe('Projects', function () {

      beforeEach(function (done) {
        ProjectsHelper.cleanUp(function () {
          Projects.create({Content:  faker.name.title()}, done);
        });
      });

      it('should project be listed in all projects.', function (done) {
        var projectIsInList = false;
        var projectData = {Content: faker.name.title()};
        Projects.create(projectData, function (err, project) {
          Projects.getAll(function (err, projects) {
            for (var i = 0; i < projects.length; i++) {
              if (projects[i].Content == project.Content) {
                projectIsInList = true;
                break;
              }
            }
            expect(projectIsInList).toBeTruthy();
            done();
          });
        });
      });
    });
  });
});
