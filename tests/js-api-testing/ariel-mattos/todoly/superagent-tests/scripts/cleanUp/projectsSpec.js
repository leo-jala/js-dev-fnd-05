
var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var ProjectsHelper = TodoLy.helpers.projects;

describe('Todo.ly', function () {

  describe('Clean Up', function () {

    describe('Projects', function () {

      it('should delete all projects from account.', function (done) {
        ProjectsHelper.cleanUp(function () {
          Projects.getAll(function (err, projects) {
            expect(projects.length).toEqual(0);
            done();
          })
        });
      });
    });
  });
});
