/*
SCENARIO: Marking an item as complete 
  Given I don't have any projects in my account 
  When I create a new project 
  And I add 1 item to that project 
  And I mark that item as a complete/done 
  Then I should see that change when getting all done items from that project 
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

      it('Should mark an item as done.', function (done) {
        var projectData = {
          Content: faker.name.title()
        };
        Projects.create(projectData, function (err, project) {
          var firstItemData = {
            Content: faker.name.title(),
            ProjectId: project.Id
          };
          Items.create(firstItemData, function (err, item) {
            item.Checked = true;
            Items.update(item, function (err, item) {
              Projects.getDoneItems(project, function(err, doneItems) {
                expect(doneItems[0].Id).toEqual(item.Id);
                expect(doneItems[0].Checked).toBeTruthy();
                done();  
              });
            });
          });
        });
      });
    });
  });
});
