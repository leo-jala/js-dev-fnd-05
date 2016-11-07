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

frisby
	.create('todo.ly Get all projects')
	.get(URLs.get_projects)
	.expectStatus(200)
	.afterJSON(function(projects){
		for (var i = 0; i < projects.length; i++) {
			if(projects[i].Icon == 0)
			{
				frisby
				.create('todo.ly Get items by project id')
				.get(URLs.get_itemsFromProjectById.replace('[projectId]', projects[i].Id))
				.expectStatus(200)
				.afterJSON(function(items){
					for (var i = 0; i < items.length; i++) {
						frisby
							.create('todo.ly Delete item by project Id')
							.delete(URLs.delete_itemById.replace('[itemId]', items[i].Id))
							.expectStatus(200)
							.toss()
					};
				})
				.toss()
			}
		};
	})
	.toss()
