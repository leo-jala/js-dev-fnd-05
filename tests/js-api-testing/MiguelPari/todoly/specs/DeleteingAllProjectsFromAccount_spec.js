// DeleteingAllProjectsFromAccount_spec.js

var frisby = require('frisby');
var faker = require('faker');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic bWlndWVsLmFuZ2VsQG1haWwuY29tOk0xZ3UzbC40bmczbA=='
		}
	}
});

var newProject = {
	Content: faker.name.title()
};

frisby
	.create('Deleting all projects from account ')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(projects){
		if(projects.length >= 2) {
			for(var i = 0; i < projects.length; i++)
			{
				frisby
					.create('Delete Project ', projects[i].Id)
					.delete('https://todo.ly/api/projects/' + projects[i].Id + '.json')
					.expectStatus(200)
					.afterJSON(function(projects) {
						frisby
							.create('Verify No Projects')
							.get('https://todo.ly/api/projects.json')
							.expectStatus(200)
							.afterJSON(function(projects){
								expect(projects.length).toBe(0);
							})
							.toss();
					})
					.toss();
			}
		} else {
			frisby
				.create('Create new Project')
				.post('https://todo.ly/api/projects.json', newProject, {json: true})
				.expectStatus(200)
				.afterJSON(function() {
					frisby
						.create('Create new Project')
						.post('https://todo.ly/api/projects.json', newProject, {json: true})
						.expectStatus(200)
						.afterJSON(function() {
							frisby
								.create('Get all projects ')
								.get('https://todo.ly/api/projects.json')
								.expectStatus(200)
								.afterJSON(function(projects){
									for(var i = 0; i < projects.length; i++)
										{
											frisby
												.create('Delete Project ', projects[i].Id)
												.delete('https://todo.ly/api/projects/' + projects[i].Id + '.json')
												.expectStatus(200)
												.afterJSON(function(projects) {
													frisby
														.create('Verify No Projects')
														.get('https://todo.ly/api/projects.json')
														.expectStatus(200)
														.afterJSON(function(projects){
															expect(projects.length).toBe(0);
														})
														.toss();
												})
												.toss();
										}
								})
								.toss();
						})
						.toss();
				})
				.toss();
		}
	})
	.toss();