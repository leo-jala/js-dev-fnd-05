//01_AllItemsShouldHaveSameProjectIdSpec.js

var frisby = require('frisby');
var faker = require('faker');
var URLs = require('./../../resources/URLs');
var Util = require('./../../util/Util');
var CleanEnvironment = require('./../../util/frisby/CleanEnvironment');

CleanEnvironment = new CleanEnvironment();

frisby.globalSetup({
		request: {
			headers: {
				'Authorization': Util.getEncondedString()
			}
		}
	});

// Given I have at least two projects created
frisby
	.create('Get all projects')
	.get(URLs.getUrl('get_projects'))
	.expectStatus(200)
	.afterJSON(function(projects){
		if (projects.length >= 2)
		{
			for (var i = 0; i < projects.length; i++) {
				// And I delete all projects
				frisby
					.create('Delete project by id')
					.delete(URLs.getUrl('delete_projectById').replace('[projectId]', projects[i].Id))
					.expectStatus(200)
					.toss()
			};
			// Then I should not get any projects when retrieving all projects from my account
			frisby
				.create('Get all projects')
				.get(URLs.getUrl('get_projects'))
				.expectStatus(200)
				.expectJSON([])
				.toss();
		}
		else
		{
			// Given I have at least two projects created
			console.log('create 2 projects');
			var projectBody = {
				Content: faker.name.title()
			};
			frisby
				.create('Create first project')
				.post(URLs.getUrl('post_project'), projectBody, {json: true})
				.expectStatus(200)
				.afterJSON(function(firstProject){
					var projectBody = {
						Content: faker.name.title()
					};
					frisby
						.create('Create second project')
						.post(URLs.getUrl('post_project'), projectBody, {json: true})
						.expectStatus(200)
						.afterJSON(function(secondProject){
							frisby
								.create('Get all projects')
								.get(URLs.getUrl('get_projects'))
								.expectStatus(200)
								.afterJSON(function(projects){
									for (var i = 0; i < projects.length; i++) {
										// And I delete all projects
										frisby
											.create('Delete project by id')
											.delete(URLs.getUrl('delete_projectById').replace('[projectId]', projects[i].Id))
											.expectStatus(200)
											.toss()
									};

									// Then I should not get any projects when retrieving all projects from my account
									frisby
										.create('Get all projects')
										.get(URLs.getUrl('get_projects'))
										.expectStatus(200)
										.expectJSON([])
										.toss();
								})
								.toss();
						})
						.toss();
				})
				.toss();

		}
	})
	.toss();
