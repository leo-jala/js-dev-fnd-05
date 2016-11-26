// 08_ItShouldListAllItemsFromAProjectSpec.js

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
		describe('Items', function(){
			
			beforeEach(function (done){
				CleanEnvironment.cleanNonSystemProjects(done);
			});		

			afterEach(function(){
				projectBody = undefined;
			});

			it('It should list all items from a project.', function(done){
				Projects.create(projectBody, function(err, projectCreated){
					expect(projectBody.Content).toEqual(projectCreated.Content);

					// Adding items to the created project
					var firstItemData = {
			            Content: faker.name.title(),
			            ProjectId: projectCreated.Id
			        };
					var secondItemData = {
						Content: faker.name.title(),
						ProjectId: projectCreated.Id
					};
    				var itemsDisplayed = 0;

					Items.create(firstItemData, function (err, firstItem) {
						expect(firstItem.ProjectId).toEqual(projectCreated.Id);
						
						Items.create(secondItemData, function (err, secondItem) {
							expect(secondItem.ProjectId).toEqual(projectCreated.Id);
							
							Items.getItemsFromProject(projectCreated.Id, function (err, res){
								var items = res.body;
								items.forEach(function (item){
									expect(item.ProjectId).toEqual(projectCreated.Id);
									itemsDisplayed++;
									if(itemsDisplayed >= items.length) {
										done();
									}
								});
							});
						});
					});			
				});
			});
		});
	});
});
