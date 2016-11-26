//02_CreatedProjectShouldBePartOfAllProjectsSpec.js

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

			it('Created project should be part of all projects.', function(done){
				Projects.create(projectBody, function(err, projectCreated){
					console.log('Created project Id:', projectCreated.Id);
					Projects.getAll(function(err, projects){
						for (var i = 0; i < projects.length; i++) {
						if (projects[i].Content == projectCreated.Content) {
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