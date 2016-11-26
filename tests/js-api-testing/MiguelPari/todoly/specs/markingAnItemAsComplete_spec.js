// markingAnItemAsComplete_spec.js


/*
Given I don't have any projects in my account 
When I create a new project 
And I add 1 item to that project 
And I mark that item as a complete/done 
Then I should see that change when getting all done items from that project
*/

// crudProjectsSpec.js
var request = require('superagent');
var faker = require('faker');

var BasicToken = 'Basic bWlndWVsLmFuZ2VsQG1haWwuY29tOk0xZ3UzbC40bmczbA==';
var BASE_URL = 'https://todo.ly/api/';
var ProjectURL = BASE_URL + 'projects/[id].json';

describe('Projects', function(){
		
	it(' Marking an item as complete', function(done){
		// Given I don't have any projects in my account
		request
			.get(BASE_URL + 'projects.json')
			.set('Authorization', BasicToken)
			.end(function(err, res){
				if(res.body.length > 0 ) {
					for(var i = 0; i < res.body.length; i++) {
						console.log(BASE_URL + 'projects/' + res.body[i].Id + '.json');
						request
							.del(BASE_URL + 'projects/' + res.body[i].Id + '.json')
							.set('Authorization', BasicToken)
							.end(function(err, res){
								if (err) {
									return done(err);
								}
							});
					}
				}
				
				// When I create a new project 
				var project = {
				Content:  faker.name.title()
				};
				
				request
					.post(BASE_URL + 'projects.json')
					.set('Authorization', BasicToken)
					.send(project)
					.end(function(err, res){
						if (err) {
							return done(err);
						} else {
							// And I add 1 item to that project 
							var projectId = res.body.Id;
							var item = {
								Content:  faker.name.title(),
								ProjectId: res.body.Id
							};
							
							request
								.post(BASE_URL + 'items.json')
								.set('Authorization', BasicToken)
								.send(item)
								.end(function(err, res){
									if (err) {
										return done(err);
									} else {										
										// And I mark that item as a complete/done 
										var itemId = res.body.Id;
										request
											.put(BASE_URL + 'Items/' + res.body.Id + '.json')
											.set('Authorization', BasicToken)
											.send({"Checked":true})
											.end(function(err, res){
												if (err) {
													return done(err);
												} else {
													// Then I should see that change when getting all done items from that project
													request														
														.get(BASE_URL + 'projects/' + projectId + '/doneitems.json')
														.set('Authorization', BasicToken)
														.end(function(err, res){
															if (err) {
																return done(err);
															} else {
																expect(res.body[0].Id).toBe(itemId);
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
});