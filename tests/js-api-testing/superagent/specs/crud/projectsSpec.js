
var faker = require('faker');
var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;
describe('Todo.ly', function(){
	
	describe('CRUD Spes', function(){
		
		describe('Projects', function(){
			
			var initialProjects;
			var itemData ={
				"Content": faker.name.title(),
				"Priority": 2,
				"ProjectId": ""
			};
			var project = {
				Content:  "Project"
			};
			var itemId = "";
			var newProject;
			var updateItemValues = {
				"Checked": true

			};
			//Gets all the availables projects
			it('should allow to get all projects.', function(done){
				Projects.getAll(function(err, projects){
					expect(projects).not.toBeUndefined();
					initialProjects = projects;
					done();
				});
			});
			//Deletes all the projecs
			it('should allow to delete a  project.', function(done){
				for(var i=0; i<initialProjects.length; i++){
					Projects.delete(initialProjects[i].Id, function(err, project){
						expect(project.Deleted).toBeTruthy();
					});
				}done();

			});
			//Creates a project
			it('should allow to create a  project.', function(done){

				Projects.create(project, function(err, project){
					newProject = project;
					itemData.ProjectId = project.Id;
					expect(newProject.Content).toEqual(project.Content);
					done();
				});

			});
			//Creates a child item
			it('should allow to create child item.', function(done){
				Items.create(itemData, function(err, item){
					itemId = item.Id;
					expect(item.Content).toEqual(itemData.Content);
					done();
				});

			});
			//Item is checked, it means
			it('should allow to update item.', function(done){
				Items.update(itemId,updateItemValues, function(err, item){
					expect(item.Checked).toEqual(updateItemValues.Checked);
					done();
				});
			});
		});	
	});	
});
