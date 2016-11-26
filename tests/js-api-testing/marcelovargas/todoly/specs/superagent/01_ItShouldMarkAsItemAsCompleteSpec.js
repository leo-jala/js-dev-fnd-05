// 01_ItShouldMarkAsItemAsCompleteSpec.js

var faker = require('faker');
var CleanEnvironment = require('./../../util/superagent/CleanEnvironment');

var TodoLy = require('./../../framework/todoly');
var Projects = TodoLy.resources.projects;
var Items = TodoLy.resources.items;

var projectBody = {
	Content:  faker.name.title()
};

describe('Todo.ly', function(){
	describe('Functional Specs', function(){
		describe('Projects', function(){
			
			// Given I don't have any projects in my account
			beforeEach(function (done){
				CleanEnvironment.cleanProjects(done);
			});		

			it('Item should be marked as completed.', function(done){

				// When I create a new project
				Projects.create(projectBody, function(err, projectCreated){
					var firstItemData = {
			            Content: faker.name.title(),
			            ProjectId: projectCreated.Id
			        };
					expect(projectBody.Content).toEqual(projectCreated.Content);

					// And I add 1 item to that project
					Items.create(firstItemData, function (err, firstItem) {
						expect(firstItem.ProjectId).toEqual(projectCreated.Id);
						var itemDone = {
							Id: firstItem.Id,
							Checked: true
						};

						// And I mark that item as a complete/done
						Items.update(itemDone, function(err, itemUpdated){
							
							// Then I should see that change when getting all done items from that project
							Projects.getDoneItems(projectCreated.Id, function (err, res){
								expect(itemUpdated.body.Id).toEqual(res.body[0].Id);
								done();		
							});
						});
					});			
				});
			});
		});
	});
});