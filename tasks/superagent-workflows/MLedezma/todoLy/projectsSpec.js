
var request = require('superagent');
var faker = require('faker');

var TodoLy = require('./../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;

describe('Todo.ly', function(){
	describe('Projects', function(){
		
		var project;
		var items;
		var newItems;
		var newProject;
		
		beforeEach(function(done){
			project = {
				Content:  faker.name.title()
			};
			Projects.create(project, function(err, project){
				newProject = project;
				done();				
			});
			items = {
						Content: faker.name.title(),
						ProjectId: newProject.ProjectId
			};
			Items.addItems(items, function(err, items){
				newItems = items;
				done();				
			});
		});
		afterEach(function(){
			project = undefined;
			newProject = undefined;
		});
			
		it('verify that a project name can be edited', function(done){
			var updatedProject = {
				Id: newProject.Id,
				Content: faker.name.title()
			};
			Projects.update(updatedProject, function(err, project){
				expect(project.Content).toEqual(updatedProject.Content);
				expect(project.Id).toEqual(newProject.Id);
				done();
			});
		});
		
		it('verify that a specific project can be deleted', function(done){
			Projects.delete(newProject.Id, function(err, project){
				expect(project.Deleted).toBeTruthy();
				expect(project.Id).toEqual(newProject.Id);
				done();
			});
		});
		
		it('verify that some items can be added to a new project', function(done){
			
			expect(newItems.ProjectId).toEqual(items.ProjectId);
		});
		
		it('verify that an item name can be changed', function(done){
			var updateItem = {
				Content: faker.name.title(),
				ProjectId: newProject.Id
			};
			
			Items.update(updateItem, function(err, items){
				expect(newItems.ProjectId).toEqual(items.ProjectId);
				expect(updateItem.Content).toEqual(items.Content);
				done();
			});
		});
		
		it('verify that an item can be deleted from a specific project', function(done){
			Items.delete(newItems.ProjectId, function(err, items){
				expect(items.Deleted).toBeTruthy();
				expect(items.ProjectId).toEqual(newItems.ProjectId);
				done();
			});
		});

		it('verify that is possible to save a due date to the item of a project', function(done){
			var updateItem = {
				ProjectId: newProject.Id,
				DueDate: "31 Aug 2027 8:30 AM"
			};
			
			Items.update(updateItem, function(err, items){
				expect(newItems.ProjectId).toEqual(items.ProjectId);
				expect(updateItem.Content).toEqual(items.Content);
				done();
			});
			
		});

		xit('verify that an item can be postponed for 5 days', function(done){
			
		});

		xit('verify that it can be set a priority to item from a project', function(done){
			
		});

		xit('verify that it is possible to change the icon of a project', function(done){
			
		});

		xit('verify that is possible to change the name of a user', function(done){
			
		});
	});	
});
