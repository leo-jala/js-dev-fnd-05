
var request = require('superagent');
var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;

describe('Todo.ly', function(){
	describe('Projects', function(){
		
		var project;
		var newProject;
		var newItemData1;
		
		beforeEach(function(done){
			project = {
				Content:  faker.name.title()
			};
			Projects.create(project, function(err, project){
				newProject = project;

				newItemData1 = {
				Content: faker.name.title(),
    			ProjectId: newProject.Id,
				};
				Items.create(newItemData1, function(err, newItemData1){
					done();	
				});			
			});
		});
		afterEach(function(){
			project = undefined;
			newProject = undefined;
		});
		
		it('Create project child and item child', function(done){
			var childProject = {
				ParentId: newProject.Id,
				Content: faker.name.title()
			};
			Projects.create(childProject, function(err, childProject){
				expect(newProject.Id).toEqual(childProject.Id);
				Projects.get(newProject.Id, function(err, project){
					expect(project.Children).toContain(childProject);
					var newChildItemData = {
						Content: faker.name.title(),
		    			ProjectId: childProject.Id,
						};
					Items.create(newChildItemData, function(err, newChildItemData){
						expect(newChildItemData.ProjectId).toEqual(childProject.Id);
						done();	
					});	
				});
			});
		});
	});	
});
