//04_ItShouldBePosibleToCreateAUserSpec.js

var frisby = require('/usr/local/lib/node_modules/frisby');
var faker = require('/usr/local/lib/node_modules/faker');
var URLs = require('./../resources/URLs');
var payloadBuild = require('./../resources/payloadBasic.json');
var Util = require('./../util/Util');

URLs = new URLs();
Util = new Util();

// console.log('*******', payloadBuild.Project.Content);

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
	.create('Created project should be able to be deleted')
	.post(URLs.get_projects, newProject, {json: true})
	.expectStatus(200)
	.expectJSON(newProject)
	.inspectJSON()
	.afterJSON(function(project){
		frisby
			.create('Get all projects')
			.delete(URLs.delete_projectById.replace('[projectId]', project.Id))
			.expectStatus(200)
			.toss();
						
	})
	.toss();

