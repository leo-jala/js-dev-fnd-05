
var request = require('superagent');
var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Projects = TodoLy.resources.projects;

describe('Todo.ly', function(){
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
		
		it('Create project child and item child', function(done){
			//TODO
		});
	});	
});
