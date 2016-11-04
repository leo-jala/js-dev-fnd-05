//01_AllItemsShouldHaveSameProjectIdSpec.js

var frisby = require('/usr/local/lib/node_modules/frisby');
var faker = require('/usr/local/lib/node_modules/faker');
var URLs = require('./../resources/URLs');
var payloadBuild = require('./../resources/payloadBasic.json');
var Util = require('./../util/Util');

URLs = new URLs();
Util = new Util();

frisby.globalSetup({
		request: {
			headers: {
				'Authorization': Util.getEncondedString()
			}
		}
	});

var newProject = {
	Content: faker.name.title()
};

frisby
	.create('All items from a project has same projectId value')
	.post(URLs.get_projects, newProject, {json: true})
	.expectStatus(200)
	.expectJSON(newProject)
	.afterJSON(function(project){
		var firstItem = {
			Content: faker.name.title(),
			ProjectId: project.Id
		};
		frisby
			.create('Create first item')
			.post(URLs.post_item, firstItem, {json: true})
			.expectStatus(200)
			.expectJSON(firstItem)
			.afterJSON(function(item1){
				
				var secondItem = {
					Content: faker.name.title(),
					ProjectId: project.Id
				};
				frisby
					.create('create second item')
					.post(URLs.post_item, secondItem, {json: true})
					.expectStatus(200)
					.expectJSON(secondItem)
					.afterJSON(function(item2){

						frisby
							.create('Get all items from project')
							.get(URLs.get_itemsFromProjectById.replace('[projectId]', project.Id), secondItem, {json: true})
							.expectStatus(200)
							.expectJSON('*', {
								ProjectId: project.Id
							})
							.toss();

					})
					.toss();

			})
			.toss();
						
	})
	.toss();

