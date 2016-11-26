// movingItemToRecycleBinLlist_spec.js

/*
Given I don't have items in my Inbox 
When I create an Inbox item setting the due-date to the past 
Then I should see that item listed in Today's item 
When I delete that item  
Then I should be able to see it in Recycle Bin list 
*/

// crudProjectsSpec.js
var request = require('superagent');
var faker = require('faker');

var BasicToken = 'Basic bWlndWVsLmFuZ2VsQG1haWwuY29tOk0xZ3UzbC40bmczbA==';
var BASE_URL = 'https://todo.ly/api/';
var ProjectURL = BASE_URL + 'projects/[id].json';


describe('Projects', function(){
		
	it(' Marking an item as complete', function(done){
		// Given I don't have items in my Inbox
		request
			.get(BASE_URL + 'Projects/0/Items.json')
			.set('Authorization', BasicToken)
			.end(function(err, res) {
				if (err) {
					return done(err);
				} else {
					if(res.body.length > 0) {
						for(var i = 0; i < res.body.length; i++) {
							request
								.del(BASE_URL + 'items/' + res.body[i].Id + '.json')
								.set('Authorization', BasicToken)
								.end(function(err, res){
									if (err) {
										return done(err);
									}
								});
						}
					}
					
					// When I create an Inbox item setting the due-date to the past 
					var itemWithPastDate = {
						Content:  faker.name.title(),
						ProjectId: 0,
						DueDate : "11/23/2016 00:00",
						DueTimeSpecified:true
					};							
							request
								.post(BASE_URL + 'items.json')
								.set('Authorization', BasicToken)
								.send(itemWithPastDate)
								.end(function(err, res){
									if (err) {
										return done(err);
									} else {
										var itemId = res.body.Id;
										// Then I should see that item listed in Today's item
										request
											.get(BASE_URL + 'Projects/-1/Items.json')
											.set('Authorization', BasicToken)
											.end(function(err, res) {
												if (err) {
													return done(err);
												} else {				
													// When I delete that item
													request
														.del(BASE_URL + 'items/' + itemId + '.json')
														.set('Authorization', BasicToken)
														.end(function(err, res){
															if (err) {
																return done(err);
															}
															else {
																//Then I should be able to see it in Recycle Bin list
																request
																	.get(BASE_URL + 'Projects/-3/Items.json')
																	.set('Authorization', BasicToken)
																	.end(function(err, res) {
																		var flag = false;
																		
																		for(var i = 0; i < res.body.length; i++)
																		{
																			if(res.body[i].Id == itemId) {
																				flag = true;
																				expect(res.body[i].Id).toBe(itemId);
																				done();
																			}
																		}
																																				
																		if(flag == false)
																		{
																			return done('Item ' + itemId + ' not found in Recycle Bin');
																		}
																		
																		done();
																	});
															}
														});													
												}
											});										
									}										
								});					
				}
			});
	});	
});
