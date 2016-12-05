
var request = require('superagent');
var faker = require('faker');

var TodoLy = require('./../../framework/todoLy');
var Items = TodoLy.resources.items;
var Filters = TodoLy.resources.filters;

describe('Todo.ly', function(){
	describe('Items', function(){
		
		var newItemData1;
		var newItemData2;
		var newItemData3;
		var newItemData4;
		var newItemData5;
		
		beforeEach(function(done){
			newItemData1 = {
				Content: faker.name.title(),
    			ProjectId: null,
    			ItemType: 1,
    			Priority: 4,
    			OwnerId: 585850
    			DueDate: "31 Dec 12:00 AM"
			};
			newItemData2 = {
				Content: faker.name.title(),
    			ProjectId: null,
    			ItemType: 1,
    			Priority: 4,
    			OwnerId: 585850
    			DueDate: "31 Dec 12:00 AM"
			};
			newItemData3 = {
				Content: faker.name.title(),
    			ProjectId: null,
    			ItemType: 1,
    			Priority: 4,
    			OwnerId: 585850
    			DueDate: "31 Dec 12:00 AM"
			};
			newItemData4 = {
				Content: faker.name.title(),
    			ProjectId: null,
    			ItemType: 1,
    			Priority: 4,
    			OwnerId: 585850
    			DueDate: "1 Jun 12:00 AM"
			};
			newItemData5 = {
				Content: faker.name.title(),
    			ProjectId: null,
    			ItemType: 1,
    			Priority: 4,
    			OwnerId: 585850
    			DueDate: "1 Jun 12:00 AM"
			};

			Items.create(newItemData1, function(err, newItemData1){
				Items.create(newItemData2, function(err, newItemData2){
					Items.create(newItemData3, function(err, newItemData3){
						Items.create(newItemData4, function(err, newItemData4){
							Items.create(newItemData5, function(err, newItemData5){
								done();
							});
						});
					});
				});
			});
		});
		afterEach(function(){
			newItemData1 = undefined;
			newItemData2 = undefined;
			newItemData3 = undefined;
			newItemData4 = undefined;
			newItemData5 = undefined;
		});
		
		it('Update overdue items to high priority', function(done){
			var updatedItemData4 = {
				Id: newItemData4.Id,
    			Priority: 1
			};
			var updatedItemData5 = {
				Id: newItemData5.Id,
    			Priority: 1
			};
			Items.update(updatedItemData4, function(err, updatedItemData4){
				expect(newItemData4.Content).toEqual(updatedItemData4.Content);
				expect(newItemData4.Id).toEqual(updatedItemData4.Id);
				expect(updatedItemData4.Priority).toEqual(1);

				Items.update(updatedItemData5, function(err, updatedItemData5){
					expect(newItemData5.Content).toEqual(updatedItemData5.Content);
					expect(newItemData5.Id).toEqual(updatedItemData5.Id);
					expect(updatedItemData5.Priority).toEqual(1);
					var currentInboxItems;
					Filters.getAllItemsById(0,function(err, currentInboxItems){
						expect(currentInboxItems).toContain(updatedItemData4);
						expect(currentInboxItems).toContain(updatedItemData5);
						done();
						});
					});

				});
			});
		});
		
	});	
});
