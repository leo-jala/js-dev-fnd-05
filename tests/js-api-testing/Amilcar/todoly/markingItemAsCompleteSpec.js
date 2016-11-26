// markingItemAsCompleteSpec.js

var request = require('superagent');
var faker = require('faker');

var BasicToken = 'Basic YW1pbGNhcm1haWRhQGdtYWlsLmNvbTo1MTUyNTcwY29yYXpvbg==';

// Suite  
describe('TodoLy', function(){
	describe('Projects', function(){
		it('should Mark an Item as completed in new project created.', function(done){
			var project = {
				Content: faker.name.title()
			};
			
			request
				.post('https://todo.ly/api/projects.json')
				.set('Authorization', BasicToken)
				.send(project)				
				.end(function(error, response){
					if (error) {
						done(error);
					}

					var expStatusCode = 200;
					var actStatusCode = response.statusCode;
					var newProject = response.body;
					
					expect(actStatusCode).toEqual(expStatusCode);
					expect(newProject.Content).toEqual(project.Content);
					
					var firstItem = {
						Content: faker.name.title(),
						ProjectId: newProject.Id
					};
					
					request
						.post('https://todo.ly/api/items.json')
						.set('Authorization', BasicToken)
						.send(firstItem)
						.end(function(error, response){
							if (error) {
								done(error);
							}
	
							expect(response.statusCode).toEqual(expStatusCode);
							expect(response.body.Content).toEqual(firstItem.Content);
							
							var firstItemId = firstItem.Id;
							var firstItemType = 'DoneItem';
						
						request
							.post('https://todo.ly/api/items/'+ firstItemId + '.json')
							.set('Authorization', BasicToken)
							.send(firstItemType)
							.end(function(error, response){
								if (error) {
									done(error);
								}
		
								expect(response.statusCode).toEqual(expStatusCode);
								expect(response.body.Id).toEqual(firstItem.ItemType);
								done();
						
							});
					});
				});
		});
				
	});
});
