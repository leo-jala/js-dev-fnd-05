//01_AllItemsShouldHaveSameProjectIdSpec.js

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
			
			it('It should be possible to create a project after cleaning non-system projects.', function(done){
				CleanEnvironment.cleanNonSystemProjects(function(err, resp){
					Projects.create(projectBody, function(err, projectCreated){
						expect(projectBody.Content).toEqual(projectCreated.Content);
						done();			
					});
				});
			});
		});
	});
});