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
			
			beforeEach(function (done){
				CleanEnvironment.cleanProjects(done);
			});		

			afterEach(function(){
				projectBody = undefined;
			});

			it('All items from a project should have same projectId value.', function(done){
				Projects.create(projectBody, function(err, projectCreated){
					console.log('Created project Id:', projectCreated.Id);
					var firstItemData = {
			            Content: faker.name.title(),
			            ProjectId: projectCreated.Id
			        };
					var secondItemData = {
						Content: faker.name.title(),
						ProjectId: projectCreated.Id
					};
					expect(projectBody.Content).toEqual(projectCreated.Content);

					Items.create(firstItemData, function (err, firstItem) {
						expect(firstItem.ProjectId).toEqual(projectCreated.Id);
							Items.create(secondItemData, function (err, secondItem) {
							expect(secondItem.ProjectId).toEqual(projectCreated.Id);
							done();
						});
					});			
				});
			});
		});
	});
});