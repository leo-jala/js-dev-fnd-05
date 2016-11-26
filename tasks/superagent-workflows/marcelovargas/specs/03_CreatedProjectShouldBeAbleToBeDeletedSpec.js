//04_ItShouldBePosibleToCreateAUserSpec.js

var faker = require('faker');
var CleanEnvironment = require('./../util/CleanEnvironment');

var TodoLy = require('./../framework/todoly');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;

var projectBody = {
	Content:  faker.name.title()
};


describe('Todo.ly', function(){
	describe('Functional Specs', function(){
		describe('Projects', function(){
			
			beforeEach(function (done){
				CleanEnvironment.cleanProjects(done);
			});		

			afterEach(function(){
				projectBody = undefined;
			});

			it('Created project should be able to be deleted.', function(done){
				Projects.create(projectBody, function(err, projectCreated){
					console.log('Created project Id:', projectCreated);
					Projects.delete(projectCreated.Id, function(err, project){
						expect(project.Deleted).toBeFalsy();
						done();
					});
				});
			});
		});
	});
});