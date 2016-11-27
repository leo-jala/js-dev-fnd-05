/*
 All items from a project has same projectId value
 Given I don't have any project created in my account
 When I create a project
 And I create 2 items for that project
 Then those items should have same projectId when retrieving project data
 */

var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;
var ProjectsHelper = TodoLy.helpers.projects;

describe('Todo.ly', function () {

  describe('Workflow specs', function () {

    describe('Items', function () {

      beforeEach(function (done) {
        ProjectsHelper.cleanUp(done);
      });

      it('should have same projectID.', function (done) {
        var projectData = {
          Content: faker.name.title()
        };
        Projects.create(projectData, function (err, project) {
          var firstItemData = {
            Content: faker.name.title(),
            ProjectId: project.Id
          };
          var secondItemData = {
            Content: faker.name.title(),
            ProjectId: project.Id
          };
          Items.create(firstItemData, function (err, firstItem) {
            expect(firstItem.ProjectId).toEqual(project.Id);
            Items.create(secondItemData, function (err, secondItem) {
              expect(secondItem.ProjectId).toEqual(project.Id);
              done();
            });
          });
        });
      });
    });
  });
});
