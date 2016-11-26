// 02_ItShouldListItemInRecycleBin.js

var faker = require('faker');
var CleanEnvironment = require('./../../util/superagent/CleanEnvironment');

var TodoLy = require('./../../framework/todoly');
var ItemsResource = TodoLy.resources.items;

describe('Todo.ly', function(){
	describe('Functional Specs', function(){
		describe('Items', function(){
			
			// Given I don't have items in my Inbox
			beforeEach(function (done){
				CleanEnvironment.cleanItems(done);
			});		

			it('It Should List Item In Recycle Bin.', function(done){

				// When I create an Inbox item setting the due-date to the past
				var firstItemData = {
		            Content: faker.name.title(),
		            ProjectId: 0,
		            DueDate: "/Date(1480083438800)/"
		        };
				ItemsResource.create(firstItemData, function (err, inboxItem) {
					expect(inboxItem.ProjectId).toEqual(null);

					// Then I should see that item listed in Today's item
					ItemsResource.getTodayItems(function(err, response){
						expect(inboxItem.Id).toEqual(response.body.Items[0].Id);
						
						ItemsResource.delete(inboxItem.Id, function (err, res){
							expect(res.body.Deleted).toBeTruthy();

							// Then I should be able to see it in Recycle Bin list
							ItemsResource.getRecycleBinItems(function(err, items){
								items.forEach(function(itemArray){
									if(itemArray.Id == inboxItem.Id){
										expect(itemArray.Id).toEqual(inboxItem.Id);
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