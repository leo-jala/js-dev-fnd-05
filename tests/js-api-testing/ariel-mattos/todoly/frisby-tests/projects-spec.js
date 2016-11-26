
/*
SCENARIO: Deleting all projects from account 
	Given I have at least two projects created 
	And I delete all projects
	Then I should not get any projects when retrieving all projects from my account 
*/

var frisby = require('frisby');
var faker = require('faker');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic eGFpbmRlbmViQGdtYWlsLmNvbTouX3hkc18u'
		}
	}
});

var firstProject = {
	Content: faker.name.title()
};

var secondProject = {
	Content: faker.name.title()
};

frisby
	.create('Deleting all projects from account')
	.post('https://todo.ly/api/projects.json', firstProject, {json: true})
	.expectStatus(200)
	.expectJSON(firstProject)
	.afterJSON(function(project1){

		frisby
			.create('Create the second project')
			.post('https://todo.ly/api/projects.json', secondProject, {json: true})
			.expectStatus(200)
			.expectJSON(secondProject)
			.afterJSON(function(project2){

				frisby
					.create('And I delete all projects')
					.get('https://todo.ly/api/projects.json')
					.expectStatus(200)
					.afterJSON(function(projects){
				        var deletedProjects = 0

				        if (projects.length > 0) {
					        projects.forEach(function (project) {

					            frisby
					                .create('Delete project')
					                .delete('https://todo.ly/api/projects/' + project.Id + '.json')
					                .expectStatus(200)
					                .afterJSON(function(deletedProject){
					                    deletedProjects++;

					                    if (deletedProjects == projects.length) {

											frisby
												.create('Then I should not get any projects when retrieving all projects from my account')
												.get('https://todo.ly/api/projects.json')
												.expectStatus(200)
												.expectJSONLength(0)
												.toss();
					                    }
					                })
					                .toss();
					        });
				        	
				        }

					})
					.toss();

			})
			.toss();
						
	})
	.toss();
