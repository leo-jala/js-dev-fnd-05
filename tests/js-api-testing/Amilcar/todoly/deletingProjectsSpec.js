// deletingProjectsSpec.js


/* SCENARIO: Deleting all projects from account
Given I have at least two projects created
And I delete all projects
Then I should not get any projects when retrieving all projects from my account */

var frisby = require('frisby');
var faker = require('faker');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic YW1pbGNhcm1haWRhQGdtYWlsLmNvbTo1MTUyNTcwY29yYXpvbg=='
		}
	}
});

frisby
	.create('There should be at least two projects to be deleted')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	//.inspectJSON()	
	.afterJSON(function(json){				
		console.log(json);
		
		frisby
			.create('Todo.ly should return an specific project.')
			.get('https://todo.ly/api/projects/' + json.Id + '.json')			
			.expectStatus(200)
			//.expectJSON({
			
			//})
			.toss();
	})
	.toss();