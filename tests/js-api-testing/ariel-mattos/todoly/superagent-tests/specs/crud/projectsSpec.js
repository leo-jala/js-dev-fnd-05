
var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;

describe('Todo.ly', function(){
	
	describe('CRUD Spes', function(){
		
		describe('Projects', function(){
			
			var project;
			var newProject;
			
			beforeEach(function(done){
				project = {
					Content:  faker.name.title()
				};
				Projects.create(project, function(err, project){
					newProject = project;
					done();				
				});
			});
			afterEach(function(){
				project = undefined;
				newProject = undefined;
			});
				
			it('should allow to get all projects.', function(done){
				Projects.getAll(function(err, projects){
					expect(projects).not.toBeUndefined();
					expect(projects.length).toBeGreaterThan(0);
					done();
				});
			});
			
			it('should allow to create a  project.', function(){
				expect(newProject.Content).toEqual(project.Content);
			});
			
			it('should allow to get/read a project.', function(done){
				Projects.get(newProject.Id, function(err, project){
					expect(project.Id).toEqual(newProject.Id);
					done();
				});
			});
			
			it('should allow to update a  project.', function(done){
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
			
			it('should allow to delete a  project.', function(done){
				Projects.delete(newProject.Id, function(err, project){
					expect(project.Deleted).toBeTruthy();
					expect(project.Id).toEqual(newProject.Id);
					done();
				});
			});
		});	
	});	
});
